---
layout: post
title:  "My Home Assistant Smart Home setup with hardware list"
date:   2019-01-31 13:46
categories: blog tech
tags: [home automation, home assistant, hardware]
published: true
description: "Continuously updated overview overview of the tech I use in my smart home."
include_ha_series: true

---

On this page I keep track of my current Smart Home setup, built around Home Assistant, Deconz and Node-RED. So, if you are interested in my setup please read on. The list of devices I use has grown organically over time, sometimes based on a certain need (like a proper light sensor), and sometimes based on a specific sale or interest for a device. Still, if I had to start over I would still pick many of these devices for a second time.

*This page is a work in progress and will update over time. Last update: Jan 2019.*

**Table of contents**

- [Sensors](#sensors)
- [Lights](#lights)
- [Input (Buttons and panels)](#input)
- [Plugs](#plugs)
- [The brains / controllers](#controllers)

<a name="sensors"></a>
## Sensors

Sensors are what my home transitioned from a *app powered* home to a *smart* home. Before I had any sensors, lights were controlled by an app (e.g. the Philips Hue app) and everything was manual. Now, with the introduction of these sensors, most lights can be turned on and off automatically.

The sensors I'm using now:

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/RTCGQ11LM.jpg"></div>
  <div class="hw-info">
    <h4>Xiaomi Aqara motion sensor (RTCGQ11LM)</h4>
    <p>In my opinion, the best motion sensor for this price. I use this sensor in all places where I want to automate something based on motion. Usually sells for around €10 (keep an eye on sales!). The device comes with a light sensor but is very inaccurate. The range is quite good but large rooms will need more than one.</p>
    <p>The Xiaomi hub is not required as it connects to my <a href="https://amzn.to/2Tov8cQ" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Best for the price. Small form factor.</p>
      <p><b>Cons:</b> Not available locally. Sends max. 1 update per minute.</p>
    </div>
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

    <div class="review">
      <p><b>Pros:</b> Very precise light sensor. Can be installed using a magnet.</p>
      <p><b>Cons:</b> Expensive. Larger than the Xiaomi version.</p>
    </div>
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

    <div class="review">
      <p><b>Pros:</b> Best for the price. Very small.</p>
      <p><b>Cons:</b> Not available locally.</p>
    </div>
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

Lights are the main 'output' of my smart home and are controlled by various inputs. As I use Deconz as my main Zigbee hub I'm not limited to a single brand.

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/hue_color.png"></div>
  <div class="hw-info">
    <h4>Philips Hue Color Bulbs</h4>
    <p>Although a bit expensive, the quality of these bulbs is very good and they have a great range of colors (in comparison to other lights I've tested). I use them to create some color highlights. For larger areas that do not need colors I went with the cheaper White Ambiance variant.</p>

    <div class="review">
      <p><b>Pros:</b> Very good color range. Great dimming capabilities. No problems with faulty bulbs (so far).</p>
      <p><b>Cons:</b> Expensive.</p>
    </div>
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
    <div class="review">
      <p><b>Pros:</b> Very good temperature range. Great dimming capabilities. No problems with faulty bulbs (so far).</p>
      <p><b>Cons:</b> Expensive.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a rel="nofollow" href="https://amzn.to/2GdLeST">Hue bulb</a> (Make sure to check your sockets for the right types)</li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img style="padding: 20px;" src="/assets/images/ha/hardware/ikea_gu10.jpg"></div>
  <div class="hw-info">
    <h4>Ikea Tradfri GU10 dimmable led</h4>
    <p>What can you do wrong with a €7 smart light? Not much. These lights are very good as a basic lights for rooms that do not need more than dimming. I did have some problems with some of these, like flickering when they were off or not wanting to connect to my hub.</p>
    <p>The Tradfri hub is not required as it connects to my <a href="https://amzn.to/2Tov8cQ" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Cheapest Zigbee light available. Decent light quality. Good value for your money.</p>
      <p><b>Cons:</b> Dimming capabilities are moderate, 1% brightness of this light is 10% of a comparable Hue light. Had some problems with faulty bulbs.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought at any Ikea store.</li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img src="/assets/images/ha/hardware/hue_gu10.jpeg"></div>
  <div class="hw-info">
    <h4>Philips Hue White Ambience GU10</h4>
    <p>Highest quality GU10 Zigbee lights I found so far. Excellent dimming capabilities (great for night lights) and a wide color range. If they would have been cheaper I would have bought more of these.</p>

    <div class="review">
      <p><b>Pros:</b> Superb dimming capabilities. Nice color temperature range.</p>
      <p><b>Cons:</b> Expensive.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a href="https://amzn.to/2W0NouR" rel="nofollow">Hue GU10</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img style="padding: 20px;" src="/assets/images/ha/hardware/ikea_gu10.jpg"></div>
  <div class="hw-info">
    <h4>Ikea Tradfri GU10 dimmable led + color temp</h4>
    <p>Double the price of the simple Tradfri light but it adds color temperature. The range of temperatures and the dimming capabilties are still not great, but its very good value for the price. If you're not to picky for light quality, these lights are a great starter-buy.</p>
    <p>The Tradfri hub is not required as it connects to my <a href="https://amzn.to/2Tov8cQ" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Very good price. Decent light quality. Has color temperature support.</p>
      <p><b>Cons:</b> Dimming capabilities are moderate, 1% brightness of this light is 10% of a comparable Hue light. Setting temperature and brightness at the same time can be difficult (<a href="{% post_url tech/2019-01-17-ikea-tradfri-temp-and-brightness-with-home-assistant %}">more info</a>).</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought at any Ikea store.</li>
    </ul>
  </div>
</div>

<a name="input"></a>
## Input (Buttons and panels)

<a name="plugs"></a>
## Plugs

<a name="controllers"></a>
## The Brains

Currently, Home Assistant, App Daemon and Node-RED are all running on a Raspberry Pi. Two other Pi's, one for Deconz and one for PiHole, complete the set. While I could have ran all these services on a single device (like a NUC), I wanted to start small with a single Pi and have extended it since then.

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

    <div class="review">
      <p><b>Pros:</b> The Deconz Pi image is an easy start. Nice interface for joining lights, sensors and switches. Good range of supported devices. The GUI can be used to debug/view the Zigbee network (gives great insight in the mesh abilities).</p>
      <p><b>Cons:</b> More expensive than the flash-your-own Zigbee radios.</p>
    </div>

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
