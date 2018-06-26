---
layout: post
title:  "Computational Pathology: Epithelium segmentation in prostate tissue using deep learning"
date:   2018-06-26 17:40
categories: blog tech
tags: [deep learning, segmentation, epethelial tissue, computational pathology]
published: false
description: ""
post_image_large: "/assets/images/gan-color/MnistColor_24_0.png"
---

# Overview

Summary in a few key points:

- Prostate cancer (PCa) originates from healthy epithelial cells.
- Segmenting these cells can improve automated methods of detecting and grading PCa.
- We use a deep learning network U-Net to automatically segment epithelial tissue.
- We compare the performance of the U-Net to a more general convolutional network.
- Our network produces fine grained segmentations.
- Improvements can be made in segmenting (high grade) PCa.

# Project background

Prostate cancer (PCa) is the most common cancer in men in developed countries[^1]. PCa develops from genetically damaged glandular epithelium, resulting in altered cellular proliferation patterns (different growth patterns). In the case of high-grade tumors, the glandular structure is eventually lost. As PCa originates from epithelial cells, glandular structures within prostate specimens are regions of interest for finding malignant tissue. For a pathologist, assessing all epithelial regions can be a time-consuming task, especially when considering the gigapixel-sized RP slides, the poorly differentiated structure of high-grade PCa and the heterogeneity  in prostate cancer growth patterns. An automated method to highlight these regions ca  help speed up this task.

Moreover, automatically differentiating between glandular tissue and other tissues is an important prerequisite for the development of automated methods for detecting PCa. Typically, deep learning methods that try to detect cancer from scanned tissue specimens use a set of annotated cancer regions as the reference standard for training. As these algorithms learn from their training data, the quality of the annotations directly influences the quality of the output. Outlining all individual tumor cells within PCa is practically infeasible due to the mixture of glandular, stromal and inflammatory components. Therefore, tumor annotations made by pathologists often contain large amounts of non-relevant tissue, which adds noise to the reference standard and, subsequently, limits the potential of these deep learning methods. By automatically removing all non-relevant tissue, these coarse tumor annotations can be removed and the ability of these networks to detect cancer could be improved.

# Methods

We trained two different types of networks: a regular fully convolutional network (FCN)[^2] and U-Net.[^3] FCNs are the
de-facto standard for deep learning on this type of data, whereas U-Nets have been specifically designed for segmentation.

# Results

# Next steps

Manual annotations are flawed due to the difficulty of making correct and precise annotations, especially in tumor areas. Immunohistochemistry can be used to address this by utilzing specific markers that target epithelial cells.

# Read more

This work was presenteted at SPIE Medical Imaging 2018. Want to read more? Please refer to the conference proceeding article below.

# References & Notes
[^1]: Torre, L. A., Bray, F., Siegel, R. L., Ferlay, J., Lortet-tieulent, J., and Jemal, A., "Global Cancer Statistics, 2012," CA: a cancer journal of clinicians. 65(2), 87-108 (2015).
