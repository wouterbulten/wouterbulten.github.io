---
layout: post
title:  "Pathologist-level Gleason grading using Deep Learning"
date:   2019-07-22 12:17
categories: blog tech
tags: [deep learning, prostate cancer, Gleason grading]
published: true
description: "We developed a fully automated deep learning system to grade prostate biopsies using 5834 biopsies from 1243 patients. A semi-automatic labeling technique was used to circumvent the need for full manual annotation by pathologists. The developed system achieved a high agreement with the reference standard. In a separate observer experiment, the deep learning system outperformed 10 out of 15 pathologists."
include_ha_series: false
---

**100-word summary:** The Gleason score is the most important prognostic marker for prostate cancer patients but suffers from significant inter-observer variability. We developed a fully automated deep learning system to grade prostate biopsies. The system was developed using 5834 biopsies from 1243 patients. A semi-automatic labeling technique was used to circumvent the need for full manual annotation by pathologists. The developed system achieved a high agreement with the reference standard. In a separate observer experiment, the deep learning system outperformed 10 out of 15 pathologists. The system has the potential to improve prostate cancer prognostics by acting as a first or second reader.

<img src="/assets/images/gleason-grading/gleason_grading_header_image.png" style="max-width: 100%;">

## Introduction

Prostate cancer is one of the most common forms of cancer, with more than 1.2 million new cases each year. The diagnosis of prostate cancer is complicated by multiple factors. Patients with low-grade prostate cancer are often better off with a wait-and-see approach than with active treatment due to the side effects of, for example, surgery. High-grade cancers, however, need to be diagnosed as soon as possible not to delay treatment and to increase patient survival. Unfortunately, diagnosis and grading of prostate cancer is a difficult task which suffers from inter- and Intra-observer variability. While experts have shown better results, such expertise is not available for every patient. In other words, there is a need for robust and reproducible grading at expert levels. We have developed an artificially intelligent system, using deep learning, that can perform the grading of prostate cancer at a pathologist-level performance.

In this blog post we describe our approach, show how we tackled the problem of data labeling and, finally, show that our deep learning system operates at pathologist-level performance. The associated manuscript can be found on [arXiv](https://arxiv.org/abs/1907.07980).

### Background on Gleason grading

Treatment planning for prostate cancer patients is based mainly on the Gleason score of a biopsy. After the biopsy procedure, a pathologist examines the tissue through a microscope. Through the microscopic analysis, the pathologist needs to distinguish between benign and malignant tissue. Any malignant tissue is then classified according to the architectural pattern of the tumor. This classification system is formally described in the Gleason grading system.

![The Gleason scoring system](/assets/images/deep-learning/gleasonscore.jpg)

In the Gleason grading system, a tumor region is assigned a number between 1 (low-risk) and 5 (high risk), though patterns 1 and 2 are not reported anymore for biopsies. For prostate biopsies, the most common pattern and the second-highest pattern together form the Gleason score, e.g., 3+5=8. To make reporting of prostate cancer more apparent for patients, Gleason scores are mapped to five prognostically different grade groups; with group 1 being the lowest risk, and 5 the highest.

## Semi-automatic data labeling

Pathology archives are often full of tissue specimens, but detailed labels of these specimens are lacking. Deep learning, however, requires large annotated datasets to reach its full potential. Due to time and budget restrictions, it is often practically infeasible to hire pathologists to annotate the data.

In the case of Gleason grading, this problem is even more significant. High-grade cancers (Gleason growth pattern 5) can express in the form of (strands of) individual tumor cells. Individually outlining hundreds of these cells in thousands of tissue specimens is no entertaining endeavor.

We developed a novel approach to circumvent the need of manual annotations. First, we sampled cases from our dataset that contained only one Gleason grade (score 3+3, 4+4 or 5+5). Then we employed the following steps to label the data:

1. For each case in our dataset, we used the original pathologist's report (from diagnostics) to determine the Gleason score of each biopsy.
2. A previously-trained tumor detection system was applied to all these biopsies. This procedure resulted in a rough outline of the tumor bulk. These tumor regions were still very coarse and needed further refinement. A description of this system can be found in the corresponding [paper](https://www.nature.com/articles/srep26286).
3. The tumor masks were refined by filtering out all non-epithelial tissue. For this we used a deep learning system that was trained using immunohistochemistry to detect epithelial cells. More information about this system can be read in the [paper](https://www.nature.com/articles/s41598-018-37257-4).
4. All detected and filtered tumor cells were assigned with the Gleason grade of the biopsy.
5. We trained an initial network on the automatically annotated data. After training, this segmentation network was able to assign Gleason growth patterns to individual cells. 

<img src="/assets/images/gleason-grading/gleason_grading_method_1.png" style="max-width: 100%;">

<img src="/assets/images/gleason-grading/gleason_grading_method_2.png" style="max-width: 100%">
