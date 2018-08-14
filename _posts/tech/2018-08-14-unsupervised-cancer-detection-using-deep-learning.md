---
layout: post
title:  "Unsupervised Cancer Detection using Deep Learning"
date:   2018-08-14 19:35
categories: blog tech
tags: [deep learning, unsupervised, prostate cancer, computational pathology]
published: false
description: ""
---

![Infographic](/assets/images/deep-learning/unsupervised_cancer_detection_infographic.png)

Prostate cancer (PCa) is the one of the most common cancers in the world[^1] and is graded by pathologist using the [Gleason grading system](https://en.wikipedia.org/wiki/Gleason_grading_system). The grading system was originally made by correlating distinctive patterns in the tissue to patient survival:

> “The way to develop a histologic classification was to forget anything I thought I knew about the behavior of prostate cancer and simply look for different histologic pictures … . Then, the pictures would be handed to statisticians and compared with a ‘gold standard' of clinical tumor behavior (ie, patient survival).” - Donald F. Gleason

To me this sounds a lot like pattern recognition; something computers could potentially do better. That's why I'm particularly interested in unsupervised method for detecting prostate cancer. All that we need is already present in the data, we 'just' need to find methods to extract it.

This project that I presented at MIDL 2018 is my first step towards this goal: a fully unsupervised method for detecting and grading prostate cancer.

![Overview of iea](/assets/images/deep-learning/overview_tissue_to_prognosis.png)

## General idea



## More info & citation

This work was presented at MIDL 2018. Want to read more? Please refer to the [conference abstract](https://arxiv.org/abs/1804.07098) as it contains more detail on the data, training procedure and network architectures. Feel free to add any questions as comments to this post.

You can use the following reference if you want to cite my paper:

> W. Bulten and G. Litjens. "Unsupervised Prostate Cancer Detection on H&E using Convolutional Adversarial Autoencoders", in: Medical Imaging with Deep Learning, 2018

Or, if you prefer BibTeX:

```tex
@InProceedings{Bult18a,
  author    = {Bulten, Wouter and Litjens, Geert},
  title     = {Unsupervised Prostate Cancer Detection on H\&E using Convolutional Adversarial Autoencoders},
  booktitle = {Medical Imaging with Deep Learning},
  year      = {2018},
  url       = {https://arxiv.org/abs/1804.07098},
  abstract  = {We propose an unsupervised method using self-clustering convolutional adversarial autoencoders to classify prostate tissue as tumor or non-tumor without any labeled training data. The clustering method is integrated into the training of the autoencoder and requires only little post-processing. Our network trains on hematoxylin and eosin (H\&E) input patches and we tested two different reconstruction targets, H&E and immunohistochemistry (IHC). We show that antibody-driven feature learning using IHC helps the network to learn relevant features for the clustering task. Our network achieves a F1 score of 0.62 using only a small set of validation labels to assign classes to clusters.},
}
```

## References

[^1]: Torre, L. A., Bray, F., Siegel, R. L., Ferlay, J., Lortet-tieulent, J., and Jemal, A., "Global Cancer Statistics, 2012," CA: a cancer journal of clinicians. 65(2), 87-108 (2015).
