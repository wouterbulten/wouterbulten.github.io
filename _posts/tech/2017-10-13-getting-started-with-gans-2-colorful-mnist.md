---
layout: post
title:  "Getting started with generative adversarial networks (GAN) Part 2: Colorful MNIST"
date:   2017-10-13 19:08
categories: blog tech
tags: [deep learning, generative adversarial networks, mnist, gan]
published: false
description: "In this post we build upon part 1 of 'Getting started with generative adversarial networks' and work with RGB data instead of monochrome."
---

In the [previous post]({% post_url tech/2017-09-18-getting-started-with-generative-adversarial-networks %}) I talked about getting started with generative adversarial networks (GANs) and applied these types of networks on the MNIST dataset. In that application we only used 1D black-and-white images which is fairly easy for a network to learn. Eventually though, we want to switch to more complex RGB images. In this post I discuss a way of ehancing the MNIST dataset with colors, a *colorful MNIST* so to say. This new dataset is a convenient way to start with generating RGB images.

> If your not familiar with GANs and/or want to read a more introductionary article. Please see my ["getting started with GANs" post]({% post_url tech/2017-09-18-getting-started-with-generative-adversarial-networks %}).

## Loading the data 

Same as before, we start with reading the original MNIST data. For this I use a small utility function from Tensorflow. The MNIST set is later used as a base for generating our colorfull images.


```python
# Read MNIST data
x_train = input_data.read_data_sets("mnist", one_hot=True).train.images
x_train = x_train.reshape(-1, 28, 28, 1).astype(np.float32)
```

With the MNIST images loaded we are going to map these to a 3-channel space. The resulting images are in RGB and will be more difficult for the network to train. Nevertheless, the complexity of the images is still manageble and lower than, for example cases, from ImageNet. This makes it a perfect next step after working on the black-and-white images.

For the transformation I apply a nice technique I adapted from a repository on [domain adaptation](https://github.com/davidtellez/adda_mnist64). The main idea is to blend an MNIST digit with a colorfull background to generate a new image. As the backgorund I use the popular "[Lenna](https://en.wikipedia.org/wiki/Lenna)" or "[Lena](https://en.wikipedia.org/wiki/Lenna)" image, but any other image can be used.


```python
# Read Lena image
lena = PILImage.open('resources/lena.jpg')
```

![png](MnistColor_files/MnistColor_6_0.png)

To generate a new sample we start with taking a random crop of the Lena image; this will be used as the background. Then, for every pixel of the MNIST digit we invert the colors to show the original number. To make the examples a bit more detailed we also upsample the digits to 64x64 pixels.

```python
def get_mnist_batch(batch_size=256, change_colors=False):
    
    # Select random batch (WxHxC)
    idx = np.random.choice(x_train.shape[0], batch_size)
    batch_raw = x_train[idx, :, :, 0].reshape((batch_size, 28, 28, 1))
    
    # Resize (this is optional but results in a training set of larger images)
    batch_resized = np.asarray([scipy.ndimage.zoom(image, (2.3, 2.3, 1), order=1) for image in batch_raw])
    
    # Extend to RGB
    batch_rgb = np.concatenate([batch_resized, batch_resized, batch_resized], axis=3)
    
    # Convert the MNIST images to binary
    batch_binary = (batch_rgb > 0.5)
    
    # Create a new placeholder variable for our batch
    batch = np.zeros((batch_size, 64, 64, 3))
    
    for i in range(batch_size):
        # Take a random crop of the Lena image (background)
        x_c = np.random.randint(0, lena.size[0] - 64)
        y_c = np.random.randint(0, lena.size[1] - 64)
        image = lena.crop((x_c, y_c, x_c + 64, y_c + 64))
        # Conver the image to float between 0 and 1
        image = np.asarray(image) / 255.0

        if change_colors:
            # Change color distribution
            for j in range(3):
                image[:, :, j] = (image[:, :, j] + np.random.uniform(0, 1)) / 2.0

        # Invert the colors at the location of the number
        image[batch_binary[i]] = 1 - image[batch_binary[i]]
        
        batch[i] = image

    return batch

```

A set of example images is shown below:


```python
count = 20
examples = get_mnist_batch(count)

plt.figure(figsize=(15,3))
for i in range(count):
    plt.subplot(2, count // 2, i+1)
    plt.imshow(examples[i])
    plt.axis('off')
    
plt.tight_layout()
plt.show()

```


![png](MnistColor_files/MnistColor_10_0.png)


# Defining the network

Now that we have created our new dataset we can define the network. As with most GANs, this network consists of a discriminator and a generator. Please see the [previous post]({% post_url tech/2017-09-18-getting-started-with-generative-adversarial-networks %}) for more information about their role. I adapted the network used in that post to work with RGB images.

```python
def discriminator():
    
    net = Sequential()
    input_shape = (64, 64, 3)
    dropout_prob = 0.4

    net.add(Conv2D(64, 5, strides=2, input_shape=input_shape, padding='same'))
    net.add(LeakyReLU())
    
    net.add(Conv2D(128, 5, strides=2, padding='same'))
    net.add(LeakyReLU())
    net.add(Dropout(dropout_prob))
    
    net.add(Conv2D(256, 5, strides=2, padding='same'))
    net.add(LeakyReLU())
    net.add(Dropout(dropout_prob))
    
    net.add(Conv2D(512, 5, strides=2, padding='same'))
    net.add(LeakyReLU())
    net.add(Dropout(dropout_prob))
    
    net.add(Flatten())
    net.add(Dense(1))
    net.add(Activation('sigmoid'))
    
    return net
```

```python
def generator():
    
    net = Sequential()
    dropout_prob = 0.4
    
    net.add(Dense(8*8*256, input_dim=100))
    net.add(BatchNormalization(momentum=0.9))
    net.add(Activation('relu'))
    net.add(Reshape((8,8,256)))
    net.add(Dropout(dropout_prob))
    
    net.add(UpSampling2D())
    net.add(Conv2D(128, 5, padding='same'))
    net.add(BatchNormalization(momentum=0.9))
    net.add(Activation('relu'))
    
    net.add(UpSampling2D())
    net.add(Conv2D(128, 5, padding='same'))
    net.add(BatchNormalization(momentum=0.9))
    net.add(Activation('relu'))
    
    net.add(UpSampling2D())
    net.add(Conv2D(64, 5, padding='same'))
    net.add(BatchNormalization(momentum=0.9))
    net.add(Activation('relu'))
    
    net.add(Conv2D(32, 5, padding='same'))
    net.add(BatchNormalization(momentum=0.9))
    net.add(Activation('relu'))
    
    net.add(Conv2D(3, 5, padding='same'))
    net.add(Activation('sigmoid'))
    
    return net
```

```python
optim_discriminator = RMSprop(lr=0.0002, clipvalue=1.0, decay=6e-8)
model_discriminator = Sequential()
model_discriminator.add(net_discriminator)
model_discriminator.compile(loss='binary_crossentropy', optimizer=optim_discriminator, metrics=['accuracy'])
```

```python
optim_adversarial = Adam(lr=0.0001, clipvalue=1.0, decay=3e-8)
model_adversarial = Sequential()
model_adversarial.add(net_generator)

# Disable layers in discriminator
for layer in net_discriminator.layers:
    layer.trainable = False

model_adversarial.add(net_discriminator)
model_adversarial.compile(loss='binary_crossentropy', optimizer=optim_adversarial, metrics=['accuracy'])
```

```python
batch_size = 128

vis_noise = np.random.uniform(-1.0, 1.0, size=[16, 100])

loss_adv = []
loss_dis = []
acc_adv = []
acc_dis = []
plot_iteration = []

for i in range(0, 20001):
    
    images_train = get_mnist_batch(batch_size)
    noise = np.random.uniform(-1.0, 1.0, size=[batch_size, 100])
    images_fake = net_generator.predict(noise)
    
    x = np.concatenate((images_train, images_fake))
    y = np.ones([2*batch_size, 1])
    y[batch_size:, :] = 0 

    # Train discriminator for one batch
    d_stats = model_discriminator.train_on_batch(x, y)
    
    y = np.ones([batch_size, 1])
    # Train the generator for a number of times
    noise = np.random.uniform(-1.0, 1.0, size=[batch_size, 100])
    a_stats = model_adversarial.train_on_batch(noise, y)
        
    if i % 50 == 0:
        plot_iteration.append(i)
        loss_adv.append(a_stats[0])
        loss_dis.append(d_stats[0])
        acc_adv.append(a_stats[1])
        acc_dis.append(d_stats[1])

        clear_output(wait=True)fig, (ax1, ax2) = plt.subplots(1,2)
fig.set_size_inches(16, 8)

ax1.plot(plot_iteration, loss_adv, label="loss adversarial")
ax1.plot(plot_iteration, loss_dis, label="loss discriminator")
#ax1.set_ylim([0,5])
ax1.legend()

ax2.plot(plot_iteration, acc_adv, label="acc adversarial")
ax2.plot(plot_iteration, acc_dis, label="acc discriminator")
ax2.legend()

plt.show()
        
        fig, (ax1, ax2) = plt.subplots(1,2)
        fig.set_size_inches(16, 8)

        ax1.plot(plot_iteration, loss_adv, label="loss adversarial")
        ax1.plot(plot_iteration, loss_dis, label="loss discriminator")
        #ax1.set_ylim([0,5])
        ax1.legend()

        ax2.plot(plot_iteration, acc_adv, label="acc adversarial")
        ax2.plot(plot_iteration, acc_dis, label="acc discriminator")
        ax2.legend()

        plt.show()
    
    if (i < 1000 and i%50 == 0) or (i % 100 == 0):
        images = net_generator.predict(vis_noise)
        
        # Map back to original range
        #images = (images + 1 ) * 0.5
        
        plt.figure(figsize=(10,10))
        for im in range(images.shape[0]):
            plt.subplot(4, 4, im+1)
            image = images[im, :, :, :]
            image = np.reshape(image, [64,64,3])
            plt.imshow(image)
            plt.axis('off')
        plt.tight_layout()
        plt.savefig(r'output/mnist-color/{}.png'.format(i))
        plt.close('all')
```


![png](MnistColor_files/MnistColor_19_0.png)



```python
fig, (ax1, ax2) = plt.subplots(1,2)
fig.set_size_inches(16, 8)

ax1.plot(plot_iteration, loss_adv, label="loss adversarial")
ax1.plot(plot_iteration, loss_dis, label="loss discriminator")
#ax1.set_ylim([0,5])
ax1.legend()

ax2.plot(plot_iteration, acc_adv, label="acc adversarial")
ax2.plot(plot_iteration, acc_dis, label="acc discriminator")
ax2.legend()

plt.show()
```


![png](MnistColor_files/MnistColor_20_0.png)



```python
import imageio

filenames = [r'output/mnist-color/{}.png'.format(i * 50) if i < 21 else r'output/mnist-color/{}.png'.format(i * 100) for i in range(200)]
print(filenames)
images = []
for filename in filenames:
    images.append(imageio.imread(filename))
imageio.mimsave(r'output/mnist-color/learning.gif', images, duration=0.07)

Image(url='output/mnist-color/learning.gif')  
```

    ['output/mnist-color/0.png', 'output/mnist-color/50.png', 'output/mnist-color/100.png', 'output/mnist-color/150.png', 'output/mnist-color/200.png', 'output/mnist-color/250.png', 'output/mnist-color/300.png', 'output/mnist-color/350.png', 'output/mnist-color/400.png', 'output/mnist-color/450.png', 'output/mnist-color/500.png', 'output/mnist-color/550.png', 'output/mnist-color/600.png', 'output/mnist-color/650.png', 'output/mnist-color/700.png', 'output/mnist-color/750.png', 'output/mnist-color/800.png', 'output/mnist-color/850.png', 'output/mnist-color/900.png', 'output/mnist-color/950.png', 'output/mnist-color/1000.png', 'output/mnist-color/2100.png', 'output/mnist-color/2200.png', 'output/mnist-color/2300.png', 'output/mnist-color/2400.png', 'output/mnist-color/2500.png', 'output/mnist-color/2600.png', 'output/mnist-color/2700.png', 'output/mnist-color/2800.png', 'output/mnist-color/2900.png', 'output/mnist-color/3000.png', 'output/mnist-color/3100.png', 'output/mnist-color/3200.png', 'output/mnist-color/3300.png', 'output/mnist-color/3400.png', 'output/mnist-color/3500.png', 'output/mnist-color/3600.png', 'output/mnist-color/3700.png', 'output/mnist-color/3800.png', 'output/mnist-color/3900.png', 'output/mnist-color/4000.png', 'output/mnist-color/4100.png', 'output/mnist-color/4200.png', 'output/mnist-color/4300.png', 'output/mnist-color/4400.png', 'output/mnist-color/4500.png', 'output/mnist-color/4600.png', 'output/mnist-color/4700.png', 'output/mnist-color/4800.png', 'output/mnist-color/4900.png', 'output/mnist-color/5000.png', 'output/mnist-color/5100.png', 'output/mnist-color/5200.png', 'output/mnist-color/5300.png', 'output/mnist-color/5400.png', 'output/mnist-color/5500.png', 'output/mnist-color/5600.png', 'output/mnist-color/5700.png', 'output/mnist-color/5800.png', 'output/mnist-color/5900.png', 'output/mnist-color/6000.png', 'output/mnist-color/6100.png', 'output/mnist-color/6200.png', 'output/mnist-color/6300.png', 'output/mnist-color/6400.png', 'output/mnist-color/6500.png', 'output/mnist-color/6600.png', 'output/mnist-color/6700.png', 'output/mnist-color/6800.png', 'output/mnist-color/6900.png', 'output/mnist-color/7000.png', 'output/mnist-color/7100.png', 'output/mnist-color/7200.png', 'output/mnist-color/7300.png', 'output/mnist-color/7400.png', 'output/mnist-color/7500.png', 'output/mnist-color/7600.png', 'output/mnist-color/7700.png', 'output/mnist-color/7800.png', 'output/mnist-color/7900.png', 'output/mnist-color/8000.png', 'output/mnist-color/8100.png', 'output/mnist-color/8200.png', 'output/mnist-color/8300.png', 'output/mnist-color/8400.png', 'output/mnist-color/8500.png', 'output/mnist-color/8600.png', 'output/mnist-color/8700.png', 'output/mnist-color/8800.png', 'output/mnist-color/8900.png', 'output/mnist-color/9000.png', 'output/mnist-color/9100.png', 'output/mnist-color/9200.png', 'output/mnist-color/9300.png', 'output/mnist-color/9400.png', 'output/mnist-color/9500.png', 'output/mnist-color/9600.png', 'output/mnist-color/9700.png', 'output/mnist-color/9800.png', 'output/mnist-color/9900.png', 'output/mnist-color/10000.png', 'output/mnist-color/10100.png', 'output/mnist-color/10200.png', 'output/mnist-color/10300.png', 'output/mnist-color/10400.png', 'output/mnist-color/10500.png', 'output/mnist-color/10600.png', 'output/mnist-color/10700.png', 'output/mnist-color/10800.png', 'output/mnist-color/10900.png', 'output/mnist-color/11000.png', 'output/mnist-color/11100.png', 'output/mnist-color/11200.png', 'output/mnist-color/11300.png', 'output/mnist-color/11400.png', 'output/mnist-color/11500.png', 'output/mnist-color/11600.png', 'output/mnist-color/11700.png', 'output/mnist-color/11800.png', 'output/mnist-color/11900.png', 'output/mnist-color/12000.png', 'output/mnist-color/12100.png', 'output/mnist-color/12200.png', 'output/mnist-color/12300.png', 'output/mnist-color/12400.png', 'output/mnist-color/12500.png', 'output/mnist-color/12600.png', 'output/mnist-color/12700.png', 'output/mnist-color/12800.png', 'output/mnist-color/12900.png', 'output/mnist-color/13000.png', 'output/mnist-color/13100.png', 'output/mnist-color/13200.png', 'output/mnist-color/13300.png', 'output/mnist-color/13400.png', 'output/mnist-color/13500.png', 'output/mnist-color/13600.png', 'output/mnist-color/13700.png', 'output/mnist-color/13800.png', 'output/mnist-color/13900.png', 'output/mnist-color/14000.png', 'output/mnist-color/14100.png', 'output/mnist-color/14200.png', 'output/mnist-color/14300.png', 'output/mnist-color/14400.png', 'output/mnist-color/14500.png', 'output/mnist-color/14600.png', 'output/mnist-color/14700.png', 'output/mnist-color/14800.png', 'output/mnist-color/14900.png', 'output/mnist-color/15000.png', 'output/mnist-color/15100.png', 'output/mnist-color/15200.png', 'output/mnist-color/15300.png', 'output/mnist-color/15400.png', 'output/mnist-color/15500.png', 'output/mnist-color/15600.png', 'output/mnist-color/15700.png', 'output/mnist-color/15800.png', 'output/mnist-color/15900.png', 'output/mnist-color/16000.png', 'output/mnist-color/16100.png', 'output/mnist-color/16200.png', 'output/mnist-color/16300.png', 'output/mnist-color/16400.png', 'output/mnist-color/16500.png', 'output/mnist-color/16600.png', 'output/mnist-color/16700.png', 'output/mnist-color/16800.png', 'output/mnist-color/16900.png', 'output/mnist-color/17000.png', 'output/mnist-color/17100.png', 'output/mnist-color/17200.png', 'output/mnist-color/17300.png', 'output/mnist-color/17400.png', 'output/mnist-color/17500.png', 'output/mnist-color/17600.png', 'output/mnist-color/17700.png', 'output/mnist-color/17800.png', 'output/mnist-color/17900.png', 'output/mnist-color/18000.png', 'output/mnist-color/18100.png', 'output/mnist-color/18200.png', 'output/mnist-color/18300.png', 'output/mnist-color/18400.png', 'output/mnist-color/18500.png', 'output/mnist-color/18600.png', 'output/mnist-color/18700.png', 'output/mnist-color/18800.png', 'output/mnist-color/18900.png', 'output/mnist-color/19000.png', 'output/mnist-color/19100.png', 'output/mnist-color/19200.png', 'output/mnist-color/19300.png', 'output/mnist-color/19400.png', 'output/mnist-color/19500.png', 'output/mnist-color/19600.png', 'output/mnist-color/19700.png', 'output/mnist-color/19800.png', 'output/mnist-color/19900.png']
    




<img src="output/mnist-color/learning.gif"/>




```python
plt.figure(figsize=(15,4))

for i in range(10):
    noise = np.zeros([1,100]) - 1 + (i * 0.2) + 0.1 
    images = net_generator.predict(noise)
    
    image = images[0, :, :, :]
    image = np.reshape(image, [64, 64, 3])
          
    plt.subplot(1, 10, i+1)
    plt.imshow(image)
    plt.axis('off')

plt.tight_layout()
plt.show()
    
    
```


![png](MnistColor_files/MnistColor_22_0.png)



```python
a = np.random.uniform(-1.0, 1.0, size=[1, 100])
b = np.random.uniform(-1.0, 1.0, size=[1, 100])

image_a = np.reshape(net_generator.predict(a)[0],  [64, 64, 3])
image_b = np.reshape(net_generator.predict(b)[0],  [64, 64, 3])
image_sum = np.reshape(net_generator.predict(b - a)[0],  [64, 64, 3])

plt.figure(figsize=(5,4))

plt.subplot(1,3,1)
plt.imshow(image_a)
plt.axis('off')

plt.subplot(1,3,2)
plt.imshow(image_b)
plt.axis('off')

plt.subplot(1,3,3)
plt.imshow(image_sum)
plt.axis('off')

plt.tight_layout()
plt.show()
```


![png](MnistColor_files/MnistColor_23_0.png)



```python
import matplotlib.patches as plot_patch

plt.figure(figsize=(15,6))
noise = np.random.uniform(-1.0, 1.0, size=[40, 100])
images_fake = net_generator.predict(noise)
images_real = get_mnist_batch(40)
choice_vector = np.random.uniform(0, 1, size=40)

for i in range(40):
    
    if choice_vector[i] > 0.5:
        image = images_fake[i, :, :, :]
    else:
        image = images_real[i]
    image = np.reshape(image, [64, 64, 3])

    plt.subplot(4, 10, i+1)
    plt.imshow(image, cmap='gray')
    plt.axis('off')

plt.tight_layout()
plt.show()

plt.figure(figsize=(15,6))

border = np.zeros((64,64,3))
border[0,:] = [255,0,0]
border[:,0] = [255,0,0]

for i in range(40):
    
    if choice_vector[i] > 0.5:
        image = images_fake[i, :, :, :]
    else:
        image = images_real[i]
    image = np.reshape(image, [64, 64, 3])
    
    ax = plt.subplot(4, 10, i+1)
    plt.imshow(image, cmap='gray')
    if choice_vector[i] > 0.5:
        ax.add_patch(plot_patch.Rectangle((0,0), 63, 63, edgecolor="red", linewidth=4, fill=False))   
    plt.axis('off')

plt.tight_layout()
plt.show()
```


![png](MnistColor_files/MnistColor_24_0.png)



![png](MnistColor_files/MnistColor_24_1.png)



```python
plt.figure(figsize=(15,4))

for i in range(10):
    noise = 0.1 * np.random.rand(1,100) - 1 + (i * 0.2) + 0.1 
    images = net_generator.predict(noise)
    
    image = images[0, :, :, :]
    image = np.reshape(image, [64, 64, 3])
          
    plt.subplot(1, 10, i+1)
    plt.imshow(image)
    plt.axis('off')

plt.tight_layout()
plt.show()
```


![png](MnistColor_files/MnistColor_25_0.png)

