---
layout: post
title:  "AI assitance, hype or reality?"
date:   2020-02-13 12:00
categories: blog tech
tags: [research, phd, deep learning, prostate cancer, Gleason grading]
published: true
description: ""
include_ha_series: false
image: /assets/images/gleason-grading/ai_assistance_social_image.png
large_twitter_card: true
imageslider: false
openseadragon: false
---

Within medicine, there is somewhat of an "**AI hype**." Mainly driven by advances in deep learning, more and more studies show the potential of using artificial intelligence as a diagnostic tool. The same trend is present in the field I am working in. The field of pathology slowly transitions from being centered around microscopes to assessing tissue using a computer screen (i.e., _digital pathology_). With this change, computational models assisting the pathologist became within reach. A new field was born: _computational pathology_.

In recent years many studies have shown that deep learning-based tools can replicate histological tasks. For prostate cancer, the main topic of my Ph.D., detection models[^pca1][^pca2] have been around for some time and are slowly becoming available to the clinic[^paige]. The next step is building AI systems that can perform prognostic tasks, such as grading cancer. The first steps have already been made in this direction. We recently published our work on [AI-based grading for prostate cancer]({% post_url tech/2019-07-23-automated-gleason-grading-deep-learning %}) in Lancet Oncology[^gl1]. In the same issue, colleagues from Karolinska (Sweden) showed similar findings[^gl2]. These studies, and others[^gl3], showed that AI systems can achieve or even outperform pathologists (within the limits of the study setup).

Despite these results, the question remains **how much benefit these systems actually offer to individual patients?** Does outperforming pathologists, also mean that it improves the diagnostic process? Moreover, despite the merits of deep learning systems, they are also constrained by limitations that can have dramatic effects on the output of such systems. The presence of artifacts, which are very common in the field of pathology, can drastically alter a prediction of a deep learning system. A human observer would not be hindered by, for example, ink on slides or cutting artifacts, and at least flag the case as ungradable. A deep learning system without countermeasures against such artifacts could happily predict high-grade cancer, even if the tissue is benign.

In the end, AI algorithms will have to be applied in the clinic and outside of a research setting. Such applications mean that there will be a pathologist in the loop that actively uses the system, or, in the event of a fully automated system, has to sign-off on the cases. In other medical domains, such as radiology, this kind of integration has already been investigated[^rad1]. Interestingly, within pathology, **research on pathologists actually using AI systems is limited**. Moreover, most studies focus on the benefits of computer-aided detection, and not on prognostic measures such as grading cancer.

After completing our study on automated Gleason grading for prostate cancer, we were curious to what extend our system could improve the diagnostic process. In a completely new study, now available as a [preprint on arXiv](https://arxiv.org/abs/2002.04500), we investigated the possible benefits of an AI system for pathologists. **Instead of focussing on pathologist-versus-AI, we instead look at potential pathologist-AI synergy.**

## AI assistance for pathologists

When we developed the deep learning system, one of our design focusses was that the system would give interpretable output. Knowing the final diagnosis for a case is interesting, but it is more useful if a system can also show on what it based its decision. In our case, we do this by letting the system highlight prostate glands that it finds malignant. This would make the inspection of the system's second opinion easy and should benefit the final diagnose, so we assumed.

In our Lancet Oncology publication[^gl1], we showed that our deep learning system outperformed 10 out of 15 panel members. We, however, only compared the AI system to the panel. To investigate the integration of the AI system in the grading workflow of the pathologist, we invited the same panel to participate in a follow-up experiment. In total, 14 pathologists and residents joined our new study. The new experiment consisted of two reads: 1) the initial unassisted read as part of the Lancet Oncology publication, and 2) an AI-assisted read which occurred after a wash-out period.

<img data-src="/assets/images/gleason-grading/ai_assistance_study_setup.png" style="max-width: 100%;" alt="Overview of the study design. In the first read, the panel graded all biopsies without assistance. In the second read, AI assistance was presented next to the biopsy." class="lazyload">

The unassisted read was already performed as part of the previous study. For the assisted read, we showed our panel of pathologists a set of 160 biopsies through an online viewer. Of these biopsies, 100 were part of the previous study; this way, we could compare performance between assisted and unassisted. The minimal time between reads was three months. The remaining 60 cases were used as controls.

The difference between the two reads was the AI feedback. While in the unassisted read, panel members graded cases as they would normally. In the assisted read, we showed the output of the AI system next to the orignal biopsy (see figure). Additionally, the biopsy-level prediction was also shown (grade group and Gleason score).

## Better performance, lower variability


# References

[^pca1]: Litjens, G. et al. Deep learning as a tool for increased accuracy and efficiency of histopathological diagnosis. Sci. Rep. 6, 26286, [Read online](https://doi.org/10.1038/srep26286) (2016).
[^pca2]: Campanella, G. et al. Clinical-grade computational pathology using weakly supervised deep learning on whole slide images. Nat. Med. 25, 1301-1309, [Read online](https://doi.org/10.1038/s41591-019-0508-1) (2019).
[^paige]: [FDA Grants Breakthrough Designation to Paige.AI](https://www.businesswire.com/news/home/20190307005205/en/FDA-Grants-Breakthrough-Designation-Paige.AI)
[^gl1]: Bulten, W. et al. Automated deep-learning system for Gleason grading of prostate cancer using biopsies: a diagnostic study. The Lancet Oncology 21, 233-241, [Read online](https://doi.org/10.1016/S1470-2045(19)30739-9) (2020).
[^gl2]: Ström, P. et al. Artificial intelligence for diagnosis and grading of prostate cancer in biopsies: a population-based, diagnostic study. The Lancet Oncology 21, 222-232, [Read online](https://doi.org/10.1016/S1470-2045(19)30738-7) (2020).
[^gl3]: Nagpal, K. et al. Development and Validation of a Deep Learning Algorithm for Improving Gleason Scoring of Prostate Cancer. npj Digital Medicine, [Read online](https://doi.org/10.1038/s41746-019-0112-2) (2018).
[^rad1]: Rodríguez-Ruiz, A. et al. Detection of Breast Cancer with Mammography: Effect of an Artificial Intelligence Support System. Radiology 290, 305-314, [Read online](https://doi.org/10.1148/radiol.2018181371) (2018).