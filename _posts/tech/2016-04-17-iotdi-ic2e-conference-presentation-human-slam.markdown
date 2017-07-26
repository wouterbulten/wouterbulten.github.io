---
layout: post
title:  "IoTDI/IC2E 2016 Presentation: Human SLAM"
date:   2016-04-17 16:43
categories: blog tech
tags: [research, iotdi, ic2e, human slam, indoor localization]
published: true
description: "Last week I gave a presentation at IoTDI 2016 regarding my Human SLAM research. My presentation can be viewed online."
---

During the joint conferences of the IEEE International Conference on the Internet-of-Things Design and Implementation (IoTDI) ([website](http://conferences.computer.org/IC2E/2016/)) and the IEEE International Conference on Cloud Engineering (IC2E) ([website](http://conferences.computer.org/IoTDI/)) I presented my work on indoor localisation and SLAM:

<blockquote>
<p>
The indoor localisation problem is more complex than just finding whereabouts of users. Finding positions of users relative to the devices of a smart space is even more important. Unfortunately, configuring such systems manually is a tedious process, requires expert knowledge, and is sensitive to changes in the environment. Moreover, many existing solutions do not take user privacy into account.

We propose a new system, called Simultaneous Localisation and Configuration (SLAC), to address the problem of locating devices and users relative to those devices, and combine this problem into a single estimation problem. The SLAC algorithm, based on FastSLAM, is able to locate devices using the received signal strength indicator (RSSI) of devices and motion data from users.
</p>
</blockquote>

The presentation can be viewed online for those that are interested in our research and design considerations. As the presentation is built using Reveal.js it can be viewed in any modern browser (both mobile and desktop).

View the presentation [full screen (external window) &rarr;](https://code.wouterbulten.nl/human-slam-presentation/)

<iframe src="https://code.wouterbulten.nl/human-slam-presentation/" style="width:100%;height: 400px"></iframe>

{% include posts/iotdi-citation.md %}
