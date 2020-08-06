---
layout: post
title:  "The potential of AI in medicine: AI-assistance improves prostate cancer grading"
date:   2020-02-26 15:00
modified_at: 2020-08-06 10:00
categories: blog tech
tags: [research, phd, deep learning, prostate cancer, Gleason grading]
published: true
description: "In a completely new study we investigated the possible benefits of an AI system for pathologists. Instead of focussing on pathologist-versus-AI, we instead look at potential pathologist-AI synergy."
include_ha_series: false
image: /assets/images/gleason-grading/gleason_grading_ai_assistance_cover.png
large_twitter_card: true
imageslider: false
openseadragon: true
---
<a name="introduction"></a>

Within medicine, there is somewhat of an "**AI hype**." Mainly driven by advances in deep learning, more and more studies show the potential of using artificial intelligence as a diagnostic tool. The same trend is present in the subfield I am working in. The field of pathology slowly transitions from being centered around microscopes to assessing tissue using a computer screen (i.e., _digital pathology_). With this change, computational models assisting the pathologist became within reach. A new field was born: _computational pathology_.


<div class="toc-container">
<b>Table of contents</b>
<ol>
<li><a href="#introduction">Introduction</a></li>
<li><a href="#ai-assistance">AI assistance for pathologists</a></li>
<li><a href="#better-performance">Better performance, lower variability</a></li>
<li><a href="#beyond-diagnostic-performance">Looking beyond diagnostic performance</a></li>
<li><a href="#external-validation">External validation</a></li>
<li><a href="#discussion">Limitations, conclusion and future outlook</a></li>
<li><a href="#live-example">Example of AI feedback</a></li>
<li><a href="#acknowledgements">Acknowledgements</a></li>
<li><a href="#references">References</a></li>
</ol>
<a href="https://www.nature.com/articles/s41379-020-0640-y" class="btn btn-outline-primary">Download paper (Open Access)</a>
</div>

In recent years many studies have shown that deep learning-based tools can replicate histological tasks. For prostate cancer, the main topic of my Ph.D. project, detection models[^pca1][^pca2] have been around for some time and are slowly becoming available to the clinic.[^paige] The next step is building AI systems that can perform prognostic tasks, such as grading cancer. The first steps have already been made in this direction. We recently published our work on [AI-based grading for prostate cancer]({% post_url tech/2019-07-23-automated-gleason-grading-deep-learning %}) in Lancet Oncology.[^gl1] In the same issue, colleagues from Karolinska (Sweden) showed similar findings.[^gl2] These studies, and others,[^gl3] showed that AI systems can achieve pathologist-level performance, or even outperform pathologists (within the limits of the study setup).

Regardless of these results, the question remains **how much benefit these systems actually offer to individual patients?** Does outperforming pathologists, also mean that it improves the diagnostic process? Despite the merits of deep learning systems, they are also constrained by limitations that can have dramatic effects on the output of such systems. The presence of artifacts, which are very common in the field of pathology, can drastically alter a prediction of a deep learning system. A human observer would not be hindered by, for example, ink on slides or cutting artifacts, and at least flag the case as ungradable. A deep learning system without countermeasures against such artifacts could happily predict high-grade cancer, even if the tissue is benign.

In the end, AI algorithms be applied in the clinic and outside of a controlled research setting. In such applications a pathologist will be in the loop that actively uses the system, or, in the event of a fully automated system, has to sign-off on the cases. In other medical domains, such as radiology, this kind of integration has already been investigated.[^rad1] Interestingly, within pathology, **research on pathologists actually using AI systems is limited**. Moreover, most studies focus on the benefits of computer-aided detection, and not on prognostic measures such as grading cancer.

After completing our [study on automated Gleason grading for prostate cancer]({% post_url tech/2019-07-23-automated-gleason-grading-deep-learning %}), we were curious to what extend our system could improve the diagnostic process. In a completely new study, now available Open Acccess through [Modern Pathology](https://www.nature.com/articles/s41379-020-0640-y), we investigated the possible benefits of an AI system for pathologists. **Instead of focussing on pathologist-versus-AI, we instead look at potential pathologist-AI synergy.**

<img data-src="/assets/images/gleason-grading/gleason_grading_ai_assistance_project_overview.png"  style="max-width: 100%;" class="lazyload" alt="Can pathologists benefit from AI-feedback? This was the central question in our study.">

<a name="ai-assistance"></a>
## AI assistance for pathologists

When we developed the deep learning system, one of our design focusses was that the system should give interpretable output. Knowing the final diagnosis for a case is interesting, but it is more useful if a system can also show **on what it based its decision**. There are several ways to show output of a deep learning system[^annotation]. In our case, we do this by letting the system highlight prostate glands that it finds malignant. Each detected malignant gland is marked either yellow <span style="color: #edd9b3"><svg class="svg-icon icon-tag"><use xlink:href="#icon-tag"></use></svg></span>, orange <span style="color: #ed8d48"><svg class="svg-icon icon-tag"><use xlink:href="#icon-tag"></use></svg></span>, or red <span style="color: #e22b3f"><svg class="svg-icon icon-tag"><use xlink:href="#icon-tag"></use></svg></span>. This would make the inspection of the system's prediction easy and should benefit the final diagnose, so we assumed.

In our Lancet Oncology publication,[^gl1] we showed that our deep learning system outperformed the manjority of the panel members. We, however, only compared the AI system to the panel. To investigate the integration of the AI system in the grading workflow of the pathologist, we invited the same panel to participate in a follow-up experiment. In total, 14 pathologists and residents joined our new study. The new experiment consisted of two reads: 1) the initial unassisted read as part of the Lancet Oncology publication, and 2) an AI-assisted read which occurred after a wash-out period.

<img data-src="/assets/images/gleason-grading/ai_assistance_study_setup.png" style="max-width: 100%;" alt="Overview of the study design. In the first read, the panel graded all biopsies without assistance. In the second read, AI assistance was presented next to the biopsy." class="lazyload">

The unassisted read was already performed as part of the previous study. For the assisted read, we showed our panel of pathologists a set of 160 biopsies through an online viewer. Of these biopsies, 100 were part of the previous study; this way, we could compare performance between assisted and unassisted. The minimal time between reads was three months. The remaining 60 cases were used as controls.

For the pathologists, the difference between the two reads was the AI feedback. While in the unassisted read, panel members graded cases as they would normally. In the assisted read, we showed the output of the AI system next to the original biopsy (see figure, and [live example](#live-example)). Additionally, the biopsy-level prediction of the system was also available to the panel (grade group and Gleason score).

For all of these biopsies, the reference standard was set by three uropathologists in consensus. Panel members determined the grade group of the biopsy, which we later compared to the reference standard. 

<a name="better-performance"></a>
## Better performance, lower variability

After the assisted read, the scores of the individual readers were compared across the two runs. As the primary metric, we used quadratically weighted [Cohen's kappa](https://en.wikipedia.org/wiki/Cohen%27s_kappa). Whereas in the unassisted read, the panel achieved a median score of 0.79, this increased to 0.87 in the AI-assisted read (an increase of almost 10%). Besides this increase, the variability of the panel members dropped; the interquartile range of the panel's kappa values dropped from 0.11 to 0.07.

Without assistance, the AI system outperformed 10 out of 14 observers (71%). In the assisted read, this flipped, and 9 out of 14 panel members exceeded the AI. On a group level, the **AI-assisted pathologists outperformed not only the unassisted reads but also the AI itself**.

<img data-src="/assets/images/gleason-grading/gleason_observer_boxplot_webfigure.svg" class="lazyload" alt="Boxplot of the unassisted and AI-assisted read. In the unassited read (left), the performance of the system is higher than the median of the panel. In the assisted read (right), the panel outperforms both itself (unassisted) and the AI system.">

When split out on experience level, less experienced pathologists benefitted the most. Most of the pathologists who had more than 15 years of experience, already scored similar or better than the AI system and had less to gain in terms of diagnostic performance. Still, the AI could have helped them grade the cases faster, something we did not explicitly test.

<a name="external-validation">
## External validation

After the experiment on the internal dataset, we performed an additional experiment to test our hypothesis on external data. It is well known that the performance of deep learning systems can degrade when applied to unseen data. Additionally, by repeating our experiment, we were interested to see if the measured effects could be reproduced.

For this external validation, we made use of the Imagebase dataset,[^imagebase] which consisted of 87 cases graded by 24 international experts in prostate pathology. The deep learning system was applied as-is to the dataset without any normalization of the data. The experiment was repeated in the same fashion: first an unassisted read, and, after a washout period, an assisted read with the AI predictions shown next to the original biopsy.

Of the 14 panel members, 12 joined the second experiment using the Imagebase dataset. In the unassisted read, the median pairwise agreement with the Imagebase panel was 0.73 (quadratically weighted Cohen’s kappa) and 9 out of the 11 panel members (75%) scored lower than the AI system. With AI assistance, the agreement increased significantly to 0.78 (p = 0.003), with the majority of the panel now outperforming the standalone AI system (10 out of 12, 83%). **In contrast to the internal experiment, improvements could be seen for all but one of the panel members, with no clear effect of experience level.**

<a name="beyond-diagnostic-performance"></a>
## Looking beyond diagnostic performance

Besides diagnostic performance, other factors are essential to increase the adoption of AI techniques in the diagnostic process[^helloai]. Pathologists are often time-constrained and have high workloads. Any algorithm has to be easy to use and ideally speed up diagnosis. More research is welcome on how we can efficiently embed these new techniques in routine practice, especially in a field that is used to analog examination through microscopes.

In our study, we did not quantitatively measure the use of our system. Though, we did ask all panel members to fill in a survey regarding the grading process and their usage of the system. A summary of some of the findings:

1. The majority of pathologists indicated that **AI assistance sped up grading**. It would be interesting to investigate the source of this time gain and to measure it quantitatively. Does it speed up finding the tumor? Makes it assessing tumor volumes faster?
2. The **gland-level prediction of the system was found most useful**. The case-level label the least. This suggests that there is an added benefit of showing AI feedback on the source level. More detailed feedback also allows for more interaction between AI systems and pathologists.
3. The majority of panel members **would like to use an AI system** during clinical practice.

For the other survey questions and the pathologist's responses, please see the [full paper](https://www.nature.com/articles/s41379-020-0640-y).

<a name="discussion"></a>
## Limitations, conclusion and future outlook

With our research, we aimed to set a new (small) step towards the clinical adoption of AI systems within pathology. For prostate cancer specifically, we showed that AI assistance reduced the observer variability of Gleason grading. Something that is highly desirable, as it could result in a stronger prognostic marker for individual patients and reduces the effect of the diagnosing pathologist on potential treatment decisions. 

Of course, there are limitations to our study that open up many avenues of future research. For example, in our main experiment, we tested only two reads with a fixed order. While we were able to reproduce the same effect in a second experiment, additional research with larger datasets is welcome. Specifically, it would be exciting to investigate the effect of AI assistance over a more extended period. Maybe the benefit of AI assistance wears out over time, as pathologists learn from the feedback and apply this knowledge to unassisted reads. It is also plausible that pathologists become faster as they get accustomed to the feedback of the system. Ultimately, systems such as ours should be evaluated on a patient-level, which allows for new approaches such as automatically prioritizing slides.

In any case, the future is exciting, both from the AI perspective as well as on the implementation side. The tools are there to improve cancer diagnosis even further.

<a name="live-example">
## Example of AI feedback

<figure>
<div id="openseadragon1" style="width: 100%; height: 400px; border: 2px solid #f4f4f4; padding: 10px;"></div>
<figcaption>Example case as presented to the patologist. Left the original biopsy, right the biopsy with the gland-level AI feedback. You can zoom in by scrolling, moving around can be done with click&drag.</figcaption>
</figure>

<a name="acknowledgements"></a>
## Acknowledgements

**Author list**: Wouter Bulten, Maschenka Balkenhol, Jean-Joël Awoumou Belinga, Américo Brilhante, Aslı Çakır, Lars Egevad, Martin Eklund, Xavier Farré, Katerina Geronatsiou, Vincent Molinié, Guilherme Pereira, Paromita Roy, Günter Saile, Paulo Salles, Ewout Schaafsma, Joëlle Tschui, Anne-Marie Vos, ISUP Pathology Imagebase Expert Panel, Hester van Boven, Robert Vink, Jeroen van der Laak, Christina Hulsbergen-van der Kaa & Geert Litjens

This work was financed by a grant from the Dutch Cancer Society (KWF).

Please use the following to refer to our paper or this post:

> Bulten, W., Balkenhol, M., Belinga, J.A. et al. Artificial intelligence assistance significantly improves Gleason grading of prostate biopsies by pathologists. Mod Pathol (2020). https://doi.org/10.1038/s41379-020-0640-y

Or, if you prefer BibTeX:

```tex
{% raw %}

@article{bulten2020artificial,
  author={Bulten, Wouter and Balkenhol, Maschenka and Belinga, Jean-Jo{\"e}l Awoumou and Brilhante, Am{\'e}rico and {\c{C}}ak{\i}r, Asl{\i} and Egevad, Lars and Eklund, Martin and Farr{\'e}, Xavier and Geronatsiou, Katerina and Molini{\'e}, Vincent and Pereira, Guilherme and Roy, Paromita and Saile, G{\"u}nter and Salles, Paulo and Schaafsma, Ewout and Tschui, Jo{\"e}lle and Vos, Anne-Marie and Delahunt, Brett and Samaratunga, Hemamali and Grignon, David J. and Evans, Andrew J. and Berney, Daniel M. and Pan, Chin-Chen and Kristiansen, Glen and Kench, James G. and Oxley, Jon and Leite, Katia R. M. and McKenney, Jesse K. and Humphrey, Peter A. and Fine, Samson W. and Tsuzuki, Toyonori and Varma, Murali and Zhou, Ming and Comperat, Eva and Bostwick, David G. and Iczkowski, Kenneth A. and Magi-Galluzzi, Cristina and Srigley, John R. and Takahashi, Hiroyuki and van der Kwast, Theo and van Boven, Hester and Vink, Robert and van der Laak, Jeroen and Hulsbergen-van der Kaa, Christina and Litjens, Geert},
  title={Artificial intelligence assistance significantly improves Gleason grading of prostate biopsies by pathologists},
  journal={Modern Pathology},
  year={2020},
  month={Aug},
  day={05},
  abstract={The Gleason score is the most important prognostic marker for prostate cancer patients, but it suffers from significant observer variability. Artificial intelligence (AI) systems based on deep learning can achieve pathologist-level performance at Gleason grading. However, the performance of such systems can degrade in the presence of artifacts, foreign tissue, or other anomalies. Pathologists integrating their expertise with feedback from an AI system could result in a synergy that outperforms both the individual pathologist and the system. Despite the hype around AI assistance, existing literature on this topic within the pathology domain is limited. We investigated the value of AI assistance for grading prostate biopsies. A panel of 14 observers graded 160 biopsies with and without AI assistance. Using AI, the agreement of the panel with an expert reference standard increased significantly (quadratically weighted Cohen's kappa, 0.799 vs. 0.872; p{\thinspace}={\thinspace}0.019). On an external validation set of 87 cases, the panel showed a significant increase in agreement with a panel of international experts in prostate pathology (quadratically weighted Cohen's kappa, 0.733 vs. 0.786; p{\thinspace}={\thinspace}0.003). In both experiments, on a group-level, AI-assisted pathologists outperformed the unassisted pathologists and the standalone AI system. Our results show the potential of AI systems for Gleason grading, but more importantly, show the benefits of pathologist-AI synergy.},
  issn={1530-0285},
  doi={10.1038/s41379-020-0640-y},
  url={https://doi.org/10.1038/s41379-020-0640-y}
}
{% endraw %}
```

## References

[^pca1]: Litjens, G. et al. Deep learning as a tool for increased accuracy and efficiency of histopathological diagnosis. Sci. Rep. 6, 26286, [Read online](https://doi.org/10.1038/srep26286) (2016).
[^pca2]: Campanella, G. et al. Clinical-grade computational pathology using weakly supervised deep learning on whole slide images. Nat. Med. 25, 1301-1309, [Read online](https://doi.org/10.1038/s41591-019-0508-1) (2019).
[^paige]: [FDA Grants Breakthrough Designation to Paige.AI](https://www.businesswire.com/news/home/20190307005205/en/FDA-Grants-Breakthrough-Designation-Paige.AI)
[^gl1]: Bulten, W. et al. Automated deep-learning system for Gleason grading of prostate cancer using biopsies: a diagnostic study. The Lancet Oncology 21, 233-241, [Read online](https://doi.org/10.1016/S1470-2045(19)30739-9) (2020).
[^gl2]: Ström, P. et al. Artificial intelligence for diagnosis and grading of prostate cancer in biopsies: a population-based, diagnostic study. The Lancet Oncology 21, 222-232, [Read online](https://doi.org/10.1016/S1470-2045(19)30738-7) (2020).
[^gl3]: Nagpal, K. et al. Development and Validation of a Deep Learning Algorithm for Improving Gleason Scoring of Prostate Cancer. npj Digital Medicine, [Read online](https://doi.org/10.1038/s41746-019-0112-2) (2018).
[^rad1]: Rodríguez-Ruiz, A. et al. Detection of Breast Cancer with Mammography: Effect of an Artificial Intelligence Support System. Radiology 290, 305-314, [Read online](https://doi.org/10.1148/radiol.2018181371) (2018).
[^imagebase]: Egevad L, Delahunt B, Berney DM, Bostwick DG, Cheville J, Comperat E, et al. Utility of pathology imagebase for standardisation of prostate cancer grading. Histopathology. 2018;73:8–18. [Read online](https://onlinelibrary.wiley.com/doi/full/10.1111/his.13471)
[^helloai]: Cai CJ, Winter S, Steiner D, Wilcox L, Terry M. Hello AI: Uncovering the Onboarding Needs of Medical Practitioners for Human-AI Collaborative Decision-Making. Proceedings of the ACM on Human-Computer Interaction 2019;3:104. [Read online](https://dl.acm.org/doi/pdf/10.1145/3359206)
[^annotation]: Interesting blog post on different ways of displaying model output: [Communicating Model Uncertainty Over Space - How can we show a pathologist an AI model's predictions](https://pair-code.github.io/interpretability/uncertainty-over-space/)

<script type="text/javascript">
function loadDzi() {
  var viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: "/assets/dzi/images/",
    tileSources: "/assets/dzi/gleason_example_1_1024.dzi"
  });
}
</script>
