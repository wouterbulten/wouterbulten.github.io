---
layout: post
title:  "My Home Assistant Smart Home setup"
date:   2019-01-27 13:46
categories: blog tech
tags: [home automation, home assistant, hardware]
published: true
description: "Continuously updated overview overview of the tech I use in my smart home."
include_ha_series: true

---

Table of contents:

- [Sensors](#sensors)
- [Lights](#lights)
- [The brains / controllers](#controllers)

<a name="sensors"></a>
## Sensors

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/RTCGQ11LM.jpg"></div>
  <div class="hw-info">
    <h4>Xiaomi Aqara motion sensor (RTCGQ11LM)</h4>
    <p>In my opinion, the best motion sensor for this price. I use this sensor in all places where I want to automate something based on motion. Usually sells for around €10 (keep an eye on sales!). The device comes with a light sensor but is very inaccurate. The range is quite good but large rooms will need more than one.</p>
    <p>The Xiaomi hub is not required as it connects to my <a href="https://amzn.to/2Tov8cQ" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought on various websites. Usuall cheapest on Gearbest or AliExpress.</li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a> or <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a></li>
    </ul>
  </div>
</div>
<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/hue_motion.jpg"></div>
  <div class="hw-info">
    <h4>Philips Hue Motion Sensor</h4>
    <p>The Hue motion sensor is bit more expensive than the Aqara motion sensors and is also larger in size. I bought one as the light sensors in the Aqara sensors are not very precise and I wanted to monitor natural light intensity.</p>

  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a href="https://amzn.to/2TmAk19" rel="nofollow">Hue Motion Sensor</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/MCCGQ11LM.jpg"></div>
  <div class="hw-info">
    <h4>Xiaomi Aqara door sensor (MCCGQ11LM)</h4>
    <p>Door sensors are one of the most usefull sensors to integrate in to a smart home. They can be used as an alarm on both windows and doors. Moreover, my main use for them is to turn on lights when a door is opened. This makes sure that lights are on even if the motion sensors did not register the motion yet.</p>
    <p>These sensors from Aqara are one of the cheapest option but work great. They are really small and sell for around €6.</p>
    <p>The Xiaomi hub is not required as it connects to my <a href="https://amzn.to/2Tov8cQ" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought on various websites. Usuall cheapest on Gearbest or AliExpress.</li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a> or <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a></li>
    </ul>
  </div>
</div>

<a name="lights"></a>
## The Lights

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/hue_color.png"></div>
  <div class="hw-info">
    <h4>Philips Hue Color Bulbs</h4>
    <p>Although a bit expensive, the quality of these bulbs is very good and they have a great range of colors (in comparison to other lights I've tested). I use them to create some color highlights. For larger areas that do not need colors I went with the cheaper White Ambiance variant.</p>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a rel="nofollow" href="https://amzn.to/2TkmUm8">Hue color bulb</a> (Make sure to check your sockets for the right types)</li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/hue_e27.png"></div>
  <div class="hw-info">
    <h4>Philips Hue White Ambiance Bulbs</h4>
    <p>I use these lights as a cheaper alternative to the color Hue lights. I use them in places where brightness and color temp is sufficient. Excellent dimming quality and the color warmth has the best range in comparison to the other brands.</p>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a rel="nofollow" href="https://amzn.to/2GdLeST">Hue bulb</a> (Make sure to check your sockets for the right types)</li>
    </ul>
  </div>
</div>

<a name="controllers"></a>
## The Brains

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/raspberrypi.jpg"></div>
  <div class="hw-info">
    <h4>Raspberry Pi 3B+ &amp; Hass.io</h4>
    <p>Main controller of the system running Home Assistant, AppDaemon and Node-RED.</p>

    <div style="display: flex; width: 100%; max-width: 200px;">
      <div style="flex: 0 1 50%; padding: 0px 30px 30px 0; max-width: 100px;">
        {% include assets/ha-logo.html %}
      </div>
      <div style="flex: 0 1 50%; padding: 0px 30px 30px 0; max-width: 100px;">
        {% include assets/node-red-logo.html %}
      </div>

    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a href="https://amzn.to/2sKF2Kq" rel="nofollow">Raspberry Pi 3B+</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://www.home-assistant.io/hassio/">Hass.io</a></li>
      <li><a href="https://www.home-assistant.io/docs/ecosystem/appdaemon/">AppDaemon</a></li>
      <li><a href="https://nodered.org/">Node-RED</a></li>
    </ul>
  </div>
</div>
<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/conbee.jpg"></div>
  <div class="hw-info">
    <h4>Raspberry Pi 3B+ &amp; ConBee</h4>
    <p>My main Zigbee hub using software from Dresden Electronics. The ConBee/RaspBee is compatible with most of devices of Hue, Osram, Innr, Ikea and Xiaomi. I've chosen for the USB version so that I can always switch to another device if needed.</p>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a href="https://amzn.to/2sKF2Kq" rel="nofollow">Raspberry Pi 3B+</a></li>
      <li><a href="https://amzn.to/2Tov8cQ" rel="nofollow">ConBee</a> or <a href="https://amzn.to/2sPKzzm" rel="nofollow">RaspBee</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/raspberrypi.jpg"></div>
  <div class="hw-info">
    <h4>Raspberry Pi B+ &amp; Pi-hole</h4>
    <p>Separate (older) Pi to run Pi-hole. I'm deliberately running this on a separate Pi to not interfere with my internet connection when tinkering with the other systems.</p>
    <img src="/assets/images/ha/hardware/pi-hole-logo.png">
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a href="https://amzn.to/2sKF2Kq" rel="nofollow">Raspberry Pi 3B+</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://pi-hole.net/">Pi-hole</a></li>
    </ul>

  </div>
</div>
