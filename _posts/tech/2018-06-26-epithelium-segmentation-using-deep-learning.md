---
layout: post
title:  "Epithelium segmentation in H&E-stained prostate tissue using deep learning"
date:   2018-06-26 17:35
categories: blog tech
tags: [deep learning, segmentation, epithelial tissue, computational pathology]
published: false
description: "Building systems to detect tumor, in this case prostate cancer, is often hard due to a lack of data. Tumor annotations made by pathologists are often coarse due to time constraints. With this project we want to automatically refine these annotations by building a system that can automatically filter out irrelevant parts of the data."
---

Some time ago I presented a [conference article](https://doi.org/10.1117/12.2292872) at SPIE Medical Imaging 2018. This publication is part of my PhD in computational pathology, deep learning and prostate cancer. In this project we tackled the problem of epithelium segmentation using deep learning.

*This post gives you a highlight of our work. Want to have more in depth details? All details are available in the [article](https://doi.org/10.1117/12.2292872) itself.*

## Why epithelium?

Prostate cancer (PCa) is the most common cancer in men in developed countries[^1]. PCa grows from healthy [epithelial cells](https://en.wikipedia.org/wiki/Epithelium). These cells form the glands within the prostate. If we can build an automated method that can find these cells we can build upon that to create new or better algorithms for automated diagnosis.

![Example prostate tissue with PCa (extracted from a core needle biopsy) (1), tumor annotations (2), epithelium segmentation (3), segmentation and annotations combined (4). ](/assets/images/deep-learning/prostate_biopsies_overlay.png)

Building systems to detect tumor is often hard due to a lack of data. Typically, deep learning methods that try to detect cancer from scanned tissue specimens use a set of annotated cancer regions as the reference standard for training. As these algorithms learn from their training data, the quality of the annotations directly influences the quality of the output. Tumor annotations made by pathologists are often coarse due to time constraints (picture above, 2nd image).  Outlining all individual tumor cells within PCa is practically infeasible due to the mixture of glandular, stromal and inflammatory components. These coarse annotations limit the potential of these deep learning methods.

With this project we want to automatically refine these annotations by building a system that can automatically filter out irrelevant parts of the data. Only the epithelial tissue is relevant for our problem so we train a system to segment epithelial tissue (3). This method results in fine-grained annotations without additional annotator effort. (4).

![Different types of glands: normal glandular structure (a); poorly differentiated, high-grade Gleason 5 PCa (b); non-tumor epithelium surrounded by inflammation (c); Gleason 3 PCa showing color variation between slides (d).](/assets/images/deep-learning/epithelium_examples.png)

## How did we approach this?

We use a deep learning network (U-Net[^2]) to automatically segment the epithelial tissue. The network is trained on patches extracted from digitally scanned prostate tissue slices. We compare the performance of the U-Net to a more general fully convolutional network (FCN).


![Example of annotated training data. Many of these regions were annotated by hand. The annotated epithelial glands are outlined in red.](/assets/images/deep-learning/prostate_annotation_example.png)

## What are the results?

Our network produces fine grained segmentations (F1 score of 0.82, AUC 0.97). U-Net outperforms general FCN, especially in parameter count. Improvements can be made in segmenting (high grade) PCa.

![Example of one of the regions of our test set. The network is applied to the input image (1). The ground truth (2) can then be compared with the network output (3). The segmentation overlay (4) shows the performance of the network: green marked pixels show true positive, blue false negative and red false positive.](/assets/images/deep-learning/classification_cancer_lg.png)

The network can also be applied on whole-slide level:

![Example of annotated training data. Many of these regions were annotated by hand. The annotated epithelial glands are outlined in red.](/assets/images/deep-learning/epithelium_wholeslide_zoom.jpg)


## Next steps

Room for improvement lays with segmenting glands as a whole. Our models rarely misses complete cancer regions, though with some high-grade PCa only parts of the glands are detected. We suspect that most of the errors are, first of all, caused by a lack of training examples and not due to a limitation of the models.

A logical next step is to improve our dataset. However, manual annotations are flawed due to the difficulty of making correct and precise annotations, especially in tumor areas. A potential solution for this is using immunohistochemistry to assist in making annotations. By using specific stains that highlight epithelial cells, we hope to generate precise and less erroneous annotations of epithelial tissue.

## More info & citation

This work was presenteted at SPIE Medical Imaging 2018. Want to read more? Please refer to the [conference paper](https://doi.org/10.1117/12.2292872). Feel free to add any questions as comments to this post.

You can use the following reference if you want to cite my paper:

> Wouter Bulten, Christina A. Hulsbergen-van de Kaa, Jeroen van der Laak, Geert J. S. Litjens, "Automated segmentation of epithelial tissue in prostatectomy slides using deep learning," Proc. SPIE 10581, Medical Imaging 2018: Digital Pathology, 105810S (6 March 2018)

Or, if you prefer BibTeX:

```tex
@inproceedings{Bulten2018,
  author = {Bulten, Wouter and {Hulsbergen-van de Kaa}, Christina A. and van der Laak, Jeroen and Litjens Geert J S},
  booktitle = {Medical Imaging 2018: Digital Pathology},
  doi = {10.1117/12.2292872},
  isbn = {9781510616516},
  title = {{Automated segmentation of epithelial tissue in prostatectomy slides using deep learning}},
  volume = {10581},
  year = {2018}
}
```

## References

[^1]: Torre, L. A., Bray, F., Siegel, R. L., Ferlay, J., Lortet-tieulent, J., and Jemal, A., "Global Cancer Statistics, 2012," CA: a cancer journal of clinicians. 65(2), 87-108 (2015).

[^2]: Ronneberger, O., Fischer, P., & Brox, T. (2015, October). U-net: Convolutional networks for biomedical image segmentation. In International Conference on Medical image computing and computer-assisted intervention (pp. 234-241). Springer, Cham.
