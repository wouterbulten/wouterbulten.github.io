---
layout: post
title:  "Improve prostate cancer diagnosis: participate in the PANDA Gleason grading challenge"
date:   2020-04-21 11:00
categories: blog tech
tags: [research, phd, deep learning, prostate cancer, Gleason grading, challenge]
published: true
description: "Can you build a deep learning model that can accurately grade protate biopsies? Participate in the PANDA challenge "
include_ha_series: false
image: /assets/images/gleason-grading/panda_logo_square.png
large_twitter_card: false
---
<img data-src="/assets/images/gleason-grading/panda_logo_square.png" class="post-image lazyload">

With 1.1 million new diagnoses every year, prostate cancer (PCa) is second most common cancer among males worldwide. The biopsy Gleason grading system is the strongest prognostic marker for prostate cancer but suffers from significant inter-observer variability, limiting its usefulness for individual patients. 

Automated deep learning systems have shown promise in accurately grading prostate cancer[^gl1]<sup>,</sup>[^gl2]. Several studies have shown that these systems can achieve pathologist-level performance, including [my own research on automated Gleason grading]({% post_url tech/2019-07-23-automated-gleason-grading-deep-learning %}). These developments have the potential to [assisting pathologists in their diagnostic process]({% post_url tech/2020-02-25-potential-of-ai-in-medicine-improving-prostate-cancer-diagnosis %}). However, A large multi-center evaluation on diagnostic data is still missing.

**Do you want to help us to improve prostate cancer diagnosis?**

## The PANDA challenge

Researchers and staff from Radboud Universiy Medical Center, Karolinska Institutet, Tampere University and Kaggle are organizing the PANDA challenge: **P**rostate c**AN**cer gra**D**e **A**ssessment using the Gleason grading system. With this challenge we aim to set the next step in automated Gleason grading for prostate cancer.

For this challenge, we are releasing all training data of two major studies[^gl1]<sup>,</sup>[^gl2] on automated Gleason grading, both previously published in *Lancet Oncology*. The training set contains almost **11.000 prostate biopsies**, with slide level labels and label masks. All submitted methods are evaluated on a private set of around 500 biopsies, split between public and private leaderboard. 

The top three teams are eligble for a cash prize. The total amount of prize money available for the challenge is $25.000. Additionally, we will invite five teams to present their method the challenge workshop at MICCAI 2020.  

> After the challenge, the data can also be used for other research. We will release the data under a [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. We ask challenge participants to respect an embargo until the challenge paper has been published. After the embargo is lifted, participants are free to publish their own results.

<img data-src="/assets/images/gleason-grading/competition-biopsy-cover-image.jpg" class="img-fluid lazyload" alt="Can you build a system to predict the ISUP grade for this biopsy?">

## How to participate

To participate in the challenge, please go to the [competition page](https://www.kaggle.com/c/prostate-cancer-grade-assessment) on [Kaggle](https://www.kaggle.com/c/prostate-cancer-grade-assessment) for more information. All challenge data can be downloaded from the Kaggle platform.

Please signup up **before July 15th** to participate in the challenge. The final submission must be submitted July 22th the latest.

<a href="https://www.kaggle.com/c/prostate-cancer-grade-assessment" class="btn btn-primary">Join the PANDA challenge</a>


## MICCAI 2020 Workshop

<img data-src="/assets/images/gleason-grading/miccai-2020-logo.png" class="post-image lazyload">

The PANDA challenge is part of the [MICCAI 2020](https://www.miccai2020.org/en/) conference. During MICCAI, we will host a workshop on the challenge and the overall results. Up to five teams will be invited to present their method. We will select teams for a presentations mostly based on ranking, but can deviate to diversify in the methods presented.




## References 

[^gl1]: Bulten, W. et al. Automated deep-learning system for Gleason grading of prostate cancer using biopsies: a diagnostic study. The Lancet Oncology 21, 233-241, [Read online](https://doi.org/10.1016/S1470-2045(19)30739-9) (2020).
[^gl2]: Ström, P. et al. Artificial intelligence for diagnosis and grading of prostate cancer in biopsies: a population-based, diagnostic study. The Lancet Oncology 21, 222-232, [Read online](https://doi.org/10.1016/S1470-2045(19)30738-7) (2020).
