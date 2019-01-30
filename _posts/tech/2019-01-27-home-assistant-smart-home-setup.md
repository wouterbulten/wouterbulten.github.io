---
layout: post
title:  "My Home Assistant Smart Home setup (with hardware recommendations)"
date:   2019-01-27 13:46
categories: blog tech
tags: [home automation, home assistant, Node-RED, wake-up, automations]
published: true
description: ""
include_ha_series: true

---

## The Lights

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/hue_e27.png"></div>
  <div class="hw-info">
    <h4>Hue White Ambiance E27</h4>
    <p>Some info</p>
  </div>
  <div class="hw-source">
    Hardware:
    <ul>
      <li><a href="">Hue E27</a></li>
    </ul>
  </div>
</div>

## The Brains

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/raspberrypi.jpg"></div>
  <div class="hw-info">
    <h4>Raspberry Pi 3B+ &amp; Hass.io</h4>
    <p>Main controller of the system running Home Assistant, AppDaemon and Node-RED.</p>
  </div>
  <div class="hw-source">
    Hardware:
    <ul>
      <li><a href="">Raspberry Pi 3B+</a></li>
    </ul>
    Software:
    <ul>
      <li><a href="https://www.home-assistant.io/hassio/">Hass.io</a></li>
      <li><a href="https://www.home-assistant.io/docs/ecosystem/appdaemon/">AppDaemon</a></li>
      <li><a href="https://nodered.org/">Node-RED</a></li>
    </ul>
  </div>
</div>
<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/raspberrypi.jpg"></div>
  <div class="hw-info">
    <h4>Raspberry Pi 3B+ &amp; ConBee</h4>
    <p>My main Zigbee hub using software from Dresden Electronics. The ConBee/RaspBee is compatible with most of devices of Hue, Osram, Innr, Ikea and Xiaomi. I've chosen for the USB version so that I can always switch to another device if needed.</p>
  </div>
  <div class="hw-source">
    Hardware:
    <ul>
      <li><a href="">Raspberry Pi 3B+</a></li>
      <li><a href="">ConBee</a> or <a href="">RaspBee</a></li>
    </ul>
    Software:
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/raspberrypi.jpg"></div>
  <div class="hw-info">
    <h4>Raspberry Pi B+ &amp; Pi-hole</h4>
    <p>Separate (older) Pi to run Pi-hole. I'm not running this on a separate Pi to not interfere with my internet connection when tinkering with the other systems.</p>
  </div>
  <div class="hw-source">
    Hardware:
    <ul>
      <li><a href="">Raspberry Pi 3B+</a></li>
    </ul>
    Software:
    <ul>
      <li><a href="https://pi-hole.net/">Pi-hole</a></li>
    </ul>

  </div>
</div>
