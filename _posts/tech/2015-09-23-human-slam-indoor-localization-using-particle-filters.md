---
layout: post
title:  "Human SLAM, Indoor localization using particle filters"
date:   2015-09-23 19:50
modified_at: 2017-07-03 20:57
categories: blog tech
tags: [slam, particle filters, external post, indoor localization, dobots]
---

A key problem (or challenge) within smart spaces is indoor localization: making estimates of users’ whereabouts. Without such information, systems are unable to react on the presence of users or, sometimes even more important, their absence. This can range from simply turning the lights on when someone enters a room to customizing the way devices interact with a specific user.

Even more important for a system to know where users exactly are, is to know where users are relative to the devices it can control or use to sense the environment. This relation between user and device location is an essential input to these systems. A central question in this field is therefore:

> What are the locations of devices in a smart space and what are the current locations of users relative to these devices?

During my graduation project at DoBots I worked on an algorithm, called SLAC : Simultaneous Localization and Configuration, to solve this double localization problem: finding position of users and devices simultaneously.  With SLAC we aimed to simultaneously locate both the user and the devices of a system deployed in an indoor environment. The target platform was the Crownstone.

The general idea of the project is to combine characteristics of devices with information from users that walk around in a building. The figure below illustrates this. We start without any knowledge (1), then we let users walk around and gather data (2), eventually we will learn the locations of each device in the building (3).

![SLAC project overview]({{ site.baseurl }}/assets/images/slacjs/slac_project_overview.png "SLAC project overview")

We use characteristics that are already available in many smart spaces: signal strength measurements (or RSSI) from devices and motion data from smart phones and other portable devices. These two inputs are combined in a system that can locate users and devices, respect individual users’ privacy and perform all estimations in real time. SLAC is based on a common technique from robotics, [simultaneous localization and mapping](https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping) (SLAM), and in particular the FastSLAM algorithm[^1].

### Algorithm overview


![SLAC algorithm]({{ site.baseurl }}/assets/images/slacjs/slac_algorithm.svg "SLAC algorithm")
{: .float-right style="width: 400px; margin: 0px 0px 15px 20px;"}

The SLAC algorithm uses two types of inputs: signal strength (RSSI) measurements to determine distances to devices and inertial measurement unit (IMU) data for pose estimations.

The raw RSSI signal contains noise. To filter out large spikes, while trying to retain distance information, a (regular) [Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter) is used to filter incoming signal strength measurements.

The second input is focussed on modeling motion. Two sensors are used to measure the motion of users: an accelerometer and a compass. These two sensors are present in almost any modern mobile device (including phones, tablets and wearables). The compass returns the current rotation or heading relative to the global north; this does not require any processing and can be used directly as an input. The acceleration is used as input for a pedometer. The pedometer is based on a design by Zhao (2010)[^2] and Ménigot (2014)[^3].

Given the distance measurements and the motion data, we can map the SLAM problem to the domain of sensor networks and indoor localization. The robot’s controls, which are used for pose sampling, are replaced by our motion estimates. The observations, which are often 2D measurements, are replaced by 1D RSSI measurements similar to the approach of Sun et al. (2009)[^4]. The flow and update rate of the SLAC algorithm is controlled by the pedometer: the algorithm is run after a new step has been detected.

As device observations are 1D and signals propagate spherical it is impossible, given a single measurement, to determine the bearing of an observation. We therefore must first make an initial estimate of a beacon location before we can refine it using the default method of FastSLAM. We solve this by implementing a second separate particle filter that focusses solely on finding an initial estimate of a device's location.  After each new measurement we update this filter by computing the importance weight and subsequently resampling the filter. When the variance between particles is low enough (given some threshold), we assume that a a devices's location has been found.

Our initialization filter is a separate component that uses the current best user estimate as input. So, to improve on our rough initial estimate we move the estimation from the global initalization filter to each individual particle. As it is impractical to update MxN particle filters (one particle filter per landmark per particle) we use an [extended Kalman filter](https://en.wikipedia.org/wiki/Extended_Kalman_filter) (EKF) to estimate a landmark’s location (similar to the original FastSLAM implementation).

When each observation is processed all particles have been updated and contain new importance weights. We then perform resampling. However, it does not make sense to resample after each step; there is just to little information for the resample process. In order to overcome this we utilize [Sequential Importance Resampling](https://en.wikipedia.org/wiki/Particle_filter#Sequential_importance_resampling_.28SIR.29) (SIR).

### Implementation

![Screenshots of application]({{ site.baseurl }}/assets/images/slacjs/slac_devices_example.png "Screenshots of application")
{: .float-right style="width: 400px; margin: 0px 0px 15px 20px;"}

SLAC has been fully implemented in Javascript and more specifically using the *ECMAScript version 6/2015* standard. Javascript has been chosen to support a large range of devices on which the algorithm can run; this includes web browsers and mobile phones. The [Apache Cordova platform](https://cordova.apache.org) was used to access native API’s of mobile devices such as the Bluetooth radio and the motion sensors.

### Simulations

We evaluated the system using simulations first; this granted the opportunity to repeat the experiment and control the environment. In the simulations we emulated the world by building an environment of similar dimensions as one of our real world test beds.

We varied the number of RSSI updates each device broadcasts between each consecutive algorithm step. As the signal strength is used to make range estimates the number of received messages could have an effect on the overall performance. The different settings are: 1, 2, 5, 10, 25, 50 and 100 updates per step. The results are shown in the figure below.

![Results of and simulations]({{ site.baseurl }}/assets/images/slacjs/slac_rssi_step.png "Results of simulations")

We found that the number of RSSI updates per algorithm step has a very high effect on the performance of the system. This follows directly from our system: given more information the Kalman filter responsible for filtering the raw RSSI signal will be able to give a less noisy estimate of the current distance to a device. These distance estimates are vital in updating device positions and weighing particles. These results suggest that we need a high update rate for real world applications.

In terms of performance, these simulations showed that within controlled environments (i.e. Gaussian noise, fixed paths of users, no obstacles), we can achieve an average localization error below .20m. This means that, after running the algorithm, the estimate of a device’s location will, on average, only be 20 centimeters away from its actual position. When the update frequency of devices is lowered, to a level similar to our live tests, the average localization error increased and resulted in an average error of .69 to 1.25m.

### Real world tests

Simulating RSSI values and movement has its drawbacks: noise is predictable and there is less interference from events in the environment. In general it is hard to fully simulate all the factors of a real world environment. In order to asses the performance of the algorithm outside a simulated world, we also tested the algorithm in the wild at the DoBots/Almende building.

While SLAC runs online and in real time, the data for this live test has been recorded and analyzed offline at a later stage. The algorithm did however run during the data collection to give feedback about the process. Each recorded data set consisted of the raw unprocessed and unfiltered motion data (i.e. acceleration and heading) and RSSI measurements. These datasets are played back several times to get an average performance. This is particular important as the algorithm is a random process: using the same input data twice will result in different outcomes.

> Interested in a demo? On the project page of SLACjs there is a [demo](http://localhost:4000/projects/slacjs/#demo) that shows the localization algorithm using real (recorded) data.

The results of our live tests are shown in the figure below (A_1 to A_4). Additionally, the simulations results of the two conditions (Sim 5 &amp; Sim 10) which are comparable to a real world setup are displayed as a reference.

![Results of live tests and simulations]({{ site.baseurl }}/assets/images/slacjs/slac_almende_results.png "Results of live tests and simulations")

All combined, our live tests showed a localization error of 2.3m, averaged over all devices. This result is good enough for room level accuracy, but there is room for improvement. These results where achieved by letting a single user walk around for one to two minutes (roughly 60 steps). All computations are done locally, i.e. running on users’ devices and without using prior information of the environment.

### Demo

A video of a simulation of the algorithm can be seen in the video below. A user is walking inside a building/smart space filled with seven simulated devices (DoBeacons). The blue line describes the ground truth of the user's path. The green line is the current best estimate of this path. Devices are displayed using squares; true positions are displayed in black and estimates in red.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/NzOi9uYiAOw?rel=0" frameborder="0" allowfullscreen></iframe>

An online demo can also be found on the website of [SLACjs](https://wouterbulten.nl/projects/slacjs/).

### Code

The full source code is available online on [GitHub](https://github.com/wouterbulten/slacjs) and is licensed under the GNU Lesser General Public License v3.


### Source

This post was originally written for the [DoBots website](https://dobots.nl/2015/09/03/human-slam-indoor-localization-using-particle-filters/).

### References

[^1]: Michael Montemerlo, Sebastian Thrun, Daphne Koller, and Ben Wegbreit. FastSLAM: A factored solution to the simultaneous localization and mapping problem. Proc. of 8th National Conference on Artificial Intelligence/14th Conference on Innovative Applications of Artificial Intelligence, 68(2):593–598, 2002.
[^2]: Neil Zhao. Full-featured pedometer design realized with 3-Axis digital accelerometer. Analog Dialogue, 44(6), 2010.
[^3]: Sébastien Ménigot. Pedometer in HTML5 for Firefox OS and Firefox for Android, 2014. [source](http://sebastien.menigot.free.fr/index.php?option=com_content&view=article&id=93:pedometer-in-html5-&catid=46:web-application-for-firefox-os&Itemid=82)
[^4]: Dali Sun, Alexander Kleiner, and Thomas M. Wendt. Multi-robot range-only SLAM by active sensor nodes for urban search and rescue. In Robocup 2008: Robot Soccer World Cup XII, volume 5399, pages 318–330, 2009.
