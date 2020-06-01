---
layout: post
title:  "Local face recognition using TensorFlow.js and Node.JS, Part 2: Learning to recognize faces"
date:   2020-06-01 14:00
categories: blog tech
tags: [home automation, home assistant, docker, face recognition]
published: true
description: ""
include_ha_series: true
onelink: true
lazyload: true
published: false
---

In this second post of my series on **face recognition for presence detection in Home Asssistant** we are going to look at actually learning to detect faces. Make sure to check out the [first post]({% post_url tech/2020-05-29-presence-detection-face-recognition-part-1-detection %}) in this series to get the basics. In this post, we will build upon the code written in part 1.

<img class="lazyload" data-src="/assets/images/facerec/detection-star-trek.jpg" alt="Can we build a face recognition system that is free and runs completely local?">

## Hardware requirements

The hardware used in this second part as in the previous part. The minimum the face recognition system should have one camera and something that can run the algorithm. In my case I use the following:

- <a href="https://amzn.to/3ci2ClP" rel="nofollow">Raspberry Pi 3B+</a> connected to a <a href="https://amzn.to/36RtQ1X" rel="nofollow">Raspberry Pi Camera</a>. This is used as the main camera system. I use [motionEyeOS](https://github.com/ccrisan/motioneyeos) as the OS on my Pi.
- An <a href="https://amzn.to/2BkXyNK" rel="nofollow">Intel NUC8i5BEK</a> that will run the face recognition system (and also runs Home Assistant).

In the examples below I will use a static image with faces, so technically you can follow along without a working camera.

## Collecting the training set

To recongize faces, we will need a training set with faces and associated labels. To store and load them efficiently, I am using a single directory per person. Each directory can contain multiple images of the same person. In the [Github repository](https://github.com/wouterbulten/ha-facerec-js) associated with this post I stored some [example faces](https://github.com/wouterbulten/ha-facerec-js/tree/master/faces) from the cast of the Big Bang Theory. These are the same example faces as used in the [face-api.js](https://github.com/justadudewhohacks/face-api.js) library I'm using. 

## Training a face matcher

To recognize faces we are using the `FaceMatcher` object that can match a unknown face to a database of face descriptors. Each discriptor is a list of numbers describing features of that face. To train this matcher, we need to generate descriptors of all faces in our training set. In this section we will fill out the `train` function that creates this matcher object:

```js
import faceapi from "face-api.js";

async function train() {
  // Train here

  // 1. Load required models
  // 2. Find all classes (persons)
  // 3. Create descriptors for each person

  return new faceapi.FaceMatcher(faceDescriptors);
}
```

First we load all the required models from disk (weights are in the Gitub repository):

```js
// 1. Load required models
await faceapi.nets.ssdMobilenetv1.loadFromDisk('weights');
await faceapi.nets.faceLandmark68Net.loadFromDisk('weights');
await faceapi.nets.faceRecognitionNet.loadFromDisk('weights');
```

When the models are loaded, we traverse the trainig dir and find all directories. If you use the Dockerfile associated with this project, example images are in `./faces`, you can override this directory by setting the `FACES_DIR` environment. If you use the example faces, the snippet below should find 8 persons.

```js
// 2. Find all classes (persons)
let trainingDir = './faces'; // Default directory in the docker image
if(process.env.FACES_DIR && fs.existsSync(process.env.FACES_DIR)) {
    console.info(`Loading training images from ${process.env.FACES_DIR}`)
    trainingDir = process.env.FACES_DIR;
}

// Traverse the training dir and get all classes (1 dir = 1 class)
const classes = fs.readdirSync(trainingDir, { withFileTypes: true })
    .filter(i => i.isDirectory())
    .map(i => i.name);
console.info(`Found ${classes.length} different persons to learn.`);

```

For each person directory, we now find all images. Each images is loaded and face descriptors are computed. In this case, we assume each person-image is a cropped version of a single face (without any background). If the images would also contain background we would have to run a face detection algorithm first, increasing the overall training time. The descriptors are labelled with the class name (name of the directory).


<img class="lazyload" data-src="/assets/images/facerec/example_faces_training.jpg" alt="Example image of each person in the training set.">

```js
const faceDescriptors = await Promise.all(classes.map(async className => {
    
    const images = fs.readdirSync(path.join(trainingDir, className), { withFileTypes: true })
        .filter(i => i.isFile())
        .map(i => path.join(trainingDir, className, i.name));

    // Load all images for this class and retrieve face descriptors
    const descriptors = await Promise.all(images.map(async path => {
        const img = await canvas.loadImage(path);
        return await faceapi.computeFaceDescriptor(img);
    }));
    
    return new faceapi.LabeledFaceDescriptors(className, descriptors);
}));
```

## Recognizing faces

With our face matcher trained, we can apply this to new images. To do this, we extend the `motion-detected` route from [part 1  of this series]({% post_url tech/2020-05-29-presence-detection-face-recognition-part-1-detection %}). Make sure to read that post for more background on how we I Express and Node.JS to set up this service.

The first step is to load the new image from the camera and compute descriptors for each face in the image. This will us the same models we loaded in the `train()` function.

```js
const img = await canvas.loadImage(process.env.CAMERA_URL);

const results = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();

console.info(`${results.length} faces detected`);
```

After the faces have been detected, we can compare the descriptors using the `FaceMatcher`. As in part 1, I save the last detection to disk so that we can view it later.

```js
// Create canvas to save to disk
const out = faceapi.createCanvasFromMedia(img);

results.forEach(({detection, descriptor}) => {
    // See if the descriptor matches a face in our database
    const label = faceMatcher.findBestMatch(descriptor).toString();
    console.info(`Detected face: ${label}`);

    const drawBox = new faceapi.draw.DrawBox(detection.box, { label });
    drawBox.draw(out)
});

// Write detections to public folder
fs.writeFileSync('public/last-detection.jpg', out.toBuffer('image/jpeg'));
console.log('Detection saved.');
```

Combining all snippets, the full route is as follows:

```js
app.get("/motion-detected", async (req, res) => {
    res.status(200).end();
    console.info("Motion detected");

    const img = await canvas.loadImage(process.env.CAMERA_URL);

    const results = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();

    console.info(`${results.length} faces detected`);

    // Create canvas to save to disk
    const out = faceapi.createCanvasFromMedia(img);

    results.forEach(({detection, descriptor}) => {
        const label = faceMatcher.findBestMatch(descriptor).toString();
        console.info(`Detected face: ${label}`);

        const drawBox = new faceapi.draw.DrawBox(detection.box, { label });
        drawBox.draw(out)
    });

    // Write detections to public folder
    fs.writeFileSync('public/last-detection.jpg', out.toBuffer('image/jpeg'));
    console.log('Detection saved.');
});
```

## Starting the server

Note that the `train` function we defined earlier is async. It has to perform several actions before we can start recognizing faces, including training the face matcher. If we would start up the Express server without the actions completed, the face matcher would not be able to match any faces. Instead, we first run the train function and after it completes start the server:

```js
let faceMatcher = null;

async function start() {
    
    console.info("Start training recognition model.")
    faceMatcher = await train();
    console.info("Finished training.");

    const PORT = process.env.PORT;

    // Start express on the defined port
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start();
```

If you start the server and run it on the [example image](https://github.com/wouterbulten/ha-facerec-js/blob/master/faces/bbt4.jpg), the algorithm should be able to detect all faces:

<img class="lazyload" data-src="/assets/images/facerec/detection-bbt.jpg" alt="Recognized faces from the BBT cast.">
