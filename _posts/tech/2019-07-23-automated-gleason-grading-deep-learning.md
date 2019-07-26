---
layout: post
title:  "Pathologist-level Gleason grading using deep learning"
date:   2019-07-22 12:17
categories: blog tech
tags: [deep learning, prostate cancer, Gleason grading]
published: true
description: "We developed a fully automated deep learning system to grade prostate biopsies using 5834 biopsies from 1243 patients, and showed that this system achieved pathologist-level performance."
include_ha_series: false
image: /assets/images/gleason-grading/gleason_grading_social_image.png
---

**100-word summary:** The Gleason score is the most important prognostic marker for prostate cancer patients but suffers from significant inter-observer variability. We developed a fully automated deep learning system to grade prostate biopsies. The system was developed using 5834 biopsies from 1243 patients. A semi-automatic labeling technique was used to circumvent the need for full manual annotation by pathologists. The developed system achieved a high agreement with the reference standard. In a separate observer experiment, the deep learning system outperformed 10 out of 15 pathologists. The system has the potential to improve prostate cancer prognostics by acting as a first or second reader.

<img src="/assets/images/gleason-grading/gleason_grading_header_image.png" style="max-width: 100%;">

**Authors:** Wouter Bulten, Hans Pinckaers, Hester van Boven, Robert Vink, Thomas de Bel, Bram van Ginneken, Jeroen van der Laak, Christina Hulsbergen-van de Kaa, Geert Litjens

**Article URL:** [https://arxiv.org/abs/1907.07980](https://arxiv.org/abs/1907.07980)

**Table of contents**

1. [Introduction](#introduction)
2. [Semi-automatic data labeling](#labeling)
3. [Network training](#training)
4. [Results](#results)
5. [Future challenges](#future)
6. [More info](#more-info)
7. [Acknowledgements](#acknowledgements)

<a name="introduction"></a>

## Introduction

Prostate cancer is one of the most common forms of cancer, with more than 1.2 million new cases each year. The diagnosis of prostate cancer is complicated by multiple factors. Patients with low-grade prostate cancer are often better off with a wait-and-see approach than with active treatment due to the side effects of, for example, surgery. High-grade cancers, however, need to be diagnosed as soon as possible not to delay treatment and to increase patient survival. Unfortunately, diagnosis and grading of prostate cancer is a difficult task which suffers from inter- and Intra-observer variability. While export uropathologists have shown better concordance rates, such expertise is not available for every patient. In other words, there is a need for robust and reproducible grading at expert levels. **We have developed an artificially intelligent system, using deep learning, that can perform the grading of prostate cancer at a pathologist-level performance.**

In this blog post, we describe our approach, show how we tackled the problem of data labeling and, finally, show that our deep learning system operates at a pathologist-level performance. The associated manuscript can be found on [arXiv](https://arxiv.org/abs/1907.07980).

### Background on Gleason grading

Treatment planning for prostate cancer patients is based mainly on the Gleason score of a biopsy. After the biopsy procedure, a pathologist examines the tissue through a microscope. Through the microscopic analysis, the pathologist needs to distinguish between benign and malignant tissue. Any malignant tissue is then classified according to the architectural pattern of the tumor. This classification system is formally described in the Gleason grading system.

![The Gleason scoring system.](/assets/images/deep-learning/gleasonscore.jpg)
<small>Image source: https://commons.wikimedia.org/wiki/File:Gleasonscore.jpg</small>

In the Gleason grading system, a tumor region is assigned a number between 1 (low-risk) and 5 (high risk), though patterns 1 and 2 are not reported anymore for biopsies. For prostate biopsies, the most common pattern and the second-highest pattern together form the Gleason score, e.g., 3+5=8. To make reporting of prostate cancer more apparent for patients, Gleason scores are mapped to five prognostically different grade groups; with group 1 being the lowest risk, and 5 the highest.

<a name="labeling"></a>
## Semi-automatic data labeling

Pathology archives are often full of tissue specimens, but detailed labels of these specimens are lacking. Deep learning, however, requires large annotated datasets to reach its full potential. Due to time and budget restrictions, it is often practically infeasible to hire pathologists to annotate the data.

In the case of Gleason grading, this problem is even more significant. High-grade cancers (Gleason growth pattern 5) can express in the form of (strands of) individual tumor cells. Individually outlining hundreds of these cells in thousands of tissue specimens is no entertaining endeavor.

We developed a novel approach to circumvent the need of manual annotations. First, we sampled cases from our dataset that contained only one Gleason grade (score 3+3, 4+4 or 5+5). Then we employed the following steps to label the data:

1. For each case in our dataset, we used the original pathologist's report (from diagnostics) to determine the Gleason score of a biopsy.
2. A previously-trained tumor detection system was applied to all these biopsies. This procedure resulted in a rough outline of the tumor bulk. These tumor regions were still very coarse and needed further refinement. A description of this system can be found in the corresponding [paper](https://www.nature.com/articles/srep26286).
3. The tumor masks were refined by filtering out all non-epithelial tissue. For this, we used a deep learning system that was trained using immunohistochemistry to detect epithelial cells. More information about this system can be read in the [paper](https://www.nature.com/articles/s41598-018-37257-4).
4. All detected and filtered tumor cells were assigned with the Gleason grade of the biopsy.
5. We trained an initial network on the automatically annotated data. After training, this segmentation network was able to assign Gleason growth patterns to individual cells.

<img src="/assets/images/gleason-grading/gleason_grading_method_1.png" style="max-width: 100%;" alt="First part of our semi-automatic labeling method.">

<a name="training"></a>
## Network training

The trained network from step 5 (above) could then be used to annotate our complete dataset. This trained network was not perfect in assigning Gleason scores as it was only trained on a subset of our dataset. To annotate the full training set, we applied the network to all cases of our set. We then used the original pathologist's report to fix any major mistakes. For example, a predicted Gleason 5 region in a biopsy with Gleason score 3+3 would be removed. Tissue that originated from benign biopsies, and was detected as malignant, was classified as "hard negative."

With our full training set annotated, we could train the final deep learning system. The whole procedure required minimal human effort. Moreover, **no pathologists were required to annotate the data; instead, we were able to utilize expert knowledge extracted from the pathologist's reports.** All training and network details can be found in the [paper on arXiv](https://arxiv.org/abs/1907.07980).

<img src="/assets/images/gleason-grading/gleason_grading_method_2.png" style="max-width: 100%" alt="Second part of our semi-automatic labeling method and application of the system to the test set.">

After the final network was trained, we were able to assign grade groups to biopsies automatically. Our system was trained as a segmentation network and outputted precise outlines of the tumor. Because of this segmentation, we can use a simple method to assign grade groups. Similar to clinical practice, we compute the volumes of each growth pattern. These volumes are then used to determine the primary and secondary Gleason grade, and finally, the grade group. We believe that this method is more interpretable and usable by pathologists in clinical practice. Each grade group prediction of the system can be easily checked by validating the marked glands.

<a name="results"></a>
## Overview of main results

We compared our deep learning system on a test set of 550 biopsies. These biopsies were graded by three experts, and their consensus is used as the reference standard. The deep learning system achieved a high agreement with a quadratic Cohen's kappa of 0.918.

Furthermore, from the test set, we selected 100 cases to be graded by an external panel. This panel consisted of 15 external raters (13 pathologists and 2 pathologists-in-training) from 10 different countries. In agreement with the reference standard (quadratic Cohen's kappa) the deep learning system outperforms 10 out of 15 pathologists.

<img src="/assets/images/gleason-grading/gleason_grading_result.png" alt="Comparison of the deep learning system with a panel of pathologists on agreement with the reference standard." style="max-width: 100%;">

We also evaluated our deep learning system on grouping patients in prognostically relevant groups: (1) benign versus malignant biopsies; and (2) using grade group 2 as cut-off. The deep learning system achieves a pathologist-level performance on both groups. Please see the full paper for further results and more detail.

<img src="/assets/images/gleason-grading/roc_100set_system_vs_pathologists.png" alt="Comparison of the deep learning system with a panel of pathologists on two relevant patient risk groups." style="max-width: 100%;">

<a name="future"></a>
## Future challenges

There are still challenges to overcome before a system such as ours can be used in clinical practice. First of all, our system was developed and evaluated using data from a single center. Including data from different centers, with different stain protocols and scanners could increase the generalization ability of the system. Second, while the performance is high, it is not perfect, and the accuracy of the system could be improved. Though, at some point, it is difficult to say what is better given the high inter- and intra-rater agreement within prostate cancer grading.

Given our results, we conclude that there is clear use for automated systems for Gleason grading. Such systems can give feedback to a pathologist at expert levels, both in a first or second reader setting. **AI systems and pathologists excel at different things, and, we firmly believe that a union of both has the most potential for the individual prostate cancer patient.**

<a name="more-info"></a>
## More info

<br><a href="https://arxiv.org/abs/1907.07980" class="btn btn-primary">Read full paper on arXiv</a>

- More details can be found in the [full manuscript](https://arxiv.org/abs/1907.07980) and [supplementary material](https://arxiv.org/src/1907.07980v1/anc/Supplementary_Information.pdf).
- A description of the tumor detection algorithm can be found in the [paper on tumor detection](https://www.nature.com/articles/srep26286).
- The epithelium segmentation system is described in a separate [paper](https://www.nature.com/articles/s41598-018-37257-4), the dataset is public and can be found [online through Zenodo](https://zenodo.org/record/1485967).
- This research was performed as part of the [Computational Pathology Group](https://www.computationalpathologygroup.eu/) and the [Diagnostic Image Analysis Group](https://www.diagnijmgen.nl) of [Radboud University Medical Center](https://www.radboudumc.nl).

You can use the following reference if you want to cite the paper:

> Bulten, Wouter; Pinckaers, Hans; van Boven, Hester; Vink, Robert; de Bel, Thomas; van Ginneken, Bram; van der Laak, Jeroen; Hulsbergen-van de Kaa, Christina; Litjens, Geert "Automated Gleason Grading of Prostate Biopsies using Deep Learning." arXiv preprint arXiv:1907.07980 (2019).

Or, if you prefer BibTeX:

```tex
{% raw %}
@article{Bulten2019Gleason,
       author = {{Bulten}, Wouter and {Pinckaers}, Hans and {van Boven}, Hester and
         {Vink}, Robert and {de Bel}, Thomas and {van Ginneken}, Bram and
         {van der Laak}, Jeroen and {Hulsbergen-van de Kaa}, Christina and
         {Litjens}, Geert},
        title = "{Automated Gleason Grading of Prostate Biopsies using Deep Learning}",
      journal = {arXiv e-prints},
     keywords = {Electrical Engineering and Systems Science - Image and Video Processing, Computer Science - Computer Vision and Pattern Recognition},
         year = "2019",
        month = "Jul",
          eid = {arXiv:1907.07980},
        pages = {arXiv:1907.07980},
archivePrefix = {arXiv},
       eprint = {1907.07980},
 primaryClass = {eess.IV},
       adsurl = {https://ui.adsabs.harvard.edu/abs/2019arXiv190707980B},
      adsnote = {Provided by the SAO/NASA Astrophysics Data System}
}
{% endraw %}
```

<a name="acknowledgements"></a>
## Acknowledgements

This work was financed by a grant from the Dutch Cancer Society (KWF). We would also like to thank all pathologists that contributed to the observer experiment.
