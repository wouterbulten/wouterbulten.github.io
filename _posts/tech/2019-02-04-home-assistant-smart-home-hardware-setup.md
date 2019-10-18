---
layout: post
title:  "My Home Assistant Smart Home setup with hardware list"
date:   2019-02-04 20:46
modified_at: 2019-10-17 14:04
categories: blog tech
tags: [home automation, home assistant, hardware]
published: true
description: "Continuously updated overview overview of the tech I use in my smart home."
include_ha_series: true
lazyload: true
onelink: true
---

On this page I keep track of my current Smart Home setup, built around Home Assistant, Deconz and Node-RED. So, if you are interested in my setup please read on. The list of devices I use has grown organically over time, sometimes based on a certain need (like a proper light sensor), and sometimes based on a specific sale or interest for a device. Still, if I had to start over I would still pick many of these devices for a second time.

*Note:* The pros and cons described here are my personal experiences. 🙂

**Table of contents**

- [Controller](#controllers)
  - Intel NUC NUC8i5BEK & Docker
  - Conbee Zigbee hub
- [Sensors](#sensors)
  - Xiaomi Aqara motion sensor
  - Philips Hue Motion Sensor
  - Xiaomi Aqara door sensor
- [Lights](#lights)
  - Philips Hue Color Bulbs
  - Philips Hue White Ambiance Bulbs
  - Ikea Tradfri GU10 dimmable led
  - Philips Hue White Ambience GU10
  - Ikea Tradfri GU10 dimmable led + color temp
- [Buttons and switches](#input)
  - Philips Hue Smart Dimmer Switch
  - Xiaomi Aqara wireless switch (WXKG11LM)
  - Xiaomi Aqara wireless switch (WXKG01LM)
- [Dashboards](#dashboards)
  - Amazon Fire Tablet
- [Plugs](#plugs)
  - OSRAM Smart+ Plug (Sylvania in the US)
- [Original setup (v1)](#controllers-v1)
  - Raspberry Pi 3B+ & Hass.io
  - Raspberry Pi 3B+ & ConBee
  - Raspberry Pi B+ & Pi-hole

*This page is a work in progress and will update over time. Last update: Oct 2019.*

<a name="controllers"></a>
## The Brains

My smart home runs on Home Assistant, App Deamon, Node-RED, and Deconz. I started small with a set of Raspberry Pis. At some point, I required a bit more processing power and switched to an Intel NUC with Docker. My [version 1](#controllers-v1) setup can still be found below.

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/intelnuc.png" alt="Intel NUC"></div>
  <div class="hw-info">
    <h4>Intel NUC</h4>
    <p>Main controller of the system running all services through Docker.</p>

    <p>Hardware components:</p>
    <ul>
      <li><a href="https://amzn.to/2BkXyNK" rel="nofollow">Intel NUC8i5BEK Bean Canyon</a></li>
      <li><a href="https://amzn.to/2nStXIi" rel="nofollow">Samsung SSD 970 EVO Plus 250 GB</a></li>
      <li><a href="https://amzn.to/35Dj1zf" rel="nofollow">HyperX Impact 16GB DDR4 2666MHz</a></li>
      <li><a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a></li>
    </ul>

    <div style="display: flex; width: 100%; max-width: 400px;">
      <div style="flex: 0 1 33%; padding: 0px 30px 30px 0; max-width: 100px;">
        {% include assets/ha-logo.html %}
      </div>
      <div style="flex: 0 1 33%; padding: 0px 30px 30px 0; max-width: 100px;">
        {% include assets/node-red-logo.html %}
      </div>
      <div style="flex: 0 1 33%; padding: 0px 30px 30px 0; max-width: 100px;">
        <img class="lazyload" data-src="/assets/images/ha/hardware/pi-hole-logo.png" style="max-width: 100%">
      </div>

    </div>

    <div class="review">
      <p><b>Pros:</b> Powerfull, runs all your services on one device. Home Assistant is more responsive, especially with a large network of devices. Can also run other services. Docker (with Docker compose) gives more flexibility.</p>
      <p><b>Cons:</b> A lot more expensive than a single Pi. Higher learning curve.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2BkXyNK" rel="nofollow">Intel Nuc</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://www.home-assistant.io/">Home Assistant</a></li>
      <li><a href="https://www.home-assistant.io/docs/ecosystem/appdaemon/">AppDaemon</a></li>
      <li><a href="https://nodered.org/">Node-RED</a></li>
      <li><a href="https://pi-hole.net/">Pi-hole</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/conbee2.jpg" alt="Conbee v2"></div>
  <div class="hw-info">
    <h4>ConBee</h4>
    <p>My main Zigbee hub using software from Dresden Electronics, connected to my Intel Nuc. I use the v1 version, but a newer v2 version is now available. The ConBee is compatible with most of devices of Hue, Osram, Innr, Ikea and Xiaomi. I chose for the USB version so that I could always switch to another device if needed. As I started with a Raspberry pi, and then moved to an Intel Nuc this turned out to be a good choice.</p>

    <div class="review">
      <p><b>Pros:</b> Huge list of compatible devices, see the <a href="https://phoscon.de/en/conbee2/compatible">compatbility list</a>. Nice interface for joining lights, sensors and switches. The GUI can be used to debug/view the Zigbee network (gives great insight in the mesh abilities).</p>
      <p><b>Cons:</b> More expensive than the flash-your-own Zigbee radios. Higher learning curve than the vendor hubs.</p>
    </div>

  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a></li>
      <li><a href="https://phoscon.de/en/conbee2/install">Official website</a></li>
      <li><a href="https://phoscon.de/en/conbee2/install#docker">Docker image</a></li>
    </ul>
  </div>
</div>


<a name="sensors"></a>
## Sensors

Sensors are what transitioned my home from an *app powered* home to a *smart* home. Before I had any sensors, lights were controlled by an app (e.g. the Philips Hue app) and everything was manual. Now, with the introduction of these sensors, most lights can be turned on and off automatically.

The sensors I'm using now:

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/RTCGQ11LM.jpg" alt="Xiaomi Aqara motion sensor (RTCGQ11LM)"></div>
  <div class="hw-info">
    <h4>Xiaomi Aqara motion sensor (RTCGQ11LM)</h4>
    <p>In my opinion, the best motion sensor for this price. I use this sensor in all places where I want to automate something based on motion. Usually sells for around €10 (keep an eye on sales!). The device also includes a light sensor but the sensor readings are very inaccurate. The motion detection range is quite good but large rooms will need more than one.</p>
    <p>The Xiaomi hub is not required as it connects to my <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Best for the price. Small form factor.</p>
      <p><b>Cons:</b> Not available locally. Sends max. 1 update per minute.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought on various websites. Usually cheapest on Gearbest or AliExpress.</li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a> or <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a></li>
    </ul>
  </div>
</div>
<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/hue_motion.jpg" alt="Philips Hue Motion Sensor"></div>
  <div class="hw-info">
    <h4>Philips Hue Motion Sensor</h4>
    <p>The Hue motion sensor is bit more expensive than the Aqara motion sensors and is also larger in size. I still bought one as the light sensors in the Aqara sensors are not very precise and I wanted to monitor natural light intensity.</p>

    <div class="review">
      <p><b>Pros:</b> Very precise light sensor. Can be installed using a magnet.</p>
      <p><b>Cons:</b> Expensive. Larger than the Xiaomi version.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2TmAk19" rel="nofollow">Hue Motion Sensor</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/MCCGQ11LM.jpg" alt="Xiaomi Aqara door sensor (MCCGQ11LM)"></div>
  <div class="hw-info">
    <h4>Xiaomi Aqara door sensor (MCCGQ11LM)</h4>
    <p>Door sensors are one of the most usefull sensors to integrate in to a smart home. They can of course be used as part of an alarm on both windows and doors. Moreover, my main use for them is to turn on lights when a door is opened. This makes sure that lights are on even if the motion sensors did not register the motion yet and results in a nice transition.</p>
    <p>These sensors from Aqara are one of the cheapest available, but work great. They are really small and sell for around €7.</p>
    <p>The Xiaomi hub is not required as it connects to my <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Best for the price. Very small.</p>
      <p><b>Cons:</b> Not available locally.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought on various websites. Usually cheapest on Gearbest or AliExpress.</li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a> or <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a></li>
    </ul>
  </div>
</div>

<a name="lights"></a>
## The Lights

Lights are the main 'output' of my smart home and are controlled by various inputs. As I use Deconz as my main Zigbee hub I'm not limited to a single brand. I have tested multiple brands (Hue, Ikea, OSRAM, Innr) and the lights I use the most are described here:

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/hue_color.png" alt="Philips Hue Color Bulbs"></div>
  <div class="hw-info">
    <h4>Philips Hue Color Bulbs</h4>
    <p>Although a bit expensive, the quality of these bulbs is very good and they have a great range of colors (in comparison to other lights I've tested). I use them to create some color highlights. For larger areas that do not need colors I went with the cheaper White Ambiance variant.</p>

    <div class="review">
      <p><b>Pros:</b> Very good color range. Great dimming capabilities. No problems with faulty bulbs (so far).</p>
      <p><b>Cons:</b> More expensive than alternatives.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" rel="nofollow" href="https://amzn.to/2TkmUm8">Hue color bulb</a><br>(Make sure to check your sockets for the right types)</li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/hue_e27.png" alt="Philips Hue White Ambiance Bulbs"></div>
  <div class="hw-info">
    <h4>Philips Hue White Ambiance Bulbs</h4>
    <p>I use these lights as a cheaper alternative to the color Hue lights. I use them in places where controlling brightness and color temp is sufficient. Excellent dimming quality and the color warmth has the best range in comparison to the other brands.</p>
    <div class="review">
      <p><b>Pros:</b> Very good temperature range. Great dimming capabilities. No problems with faulty bulbs (so far).</p>
      <p><b>Cons:</b> More expensive than alternatives.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" rel="nofollow" href="https://amzn.to/2GdLeST">Hue bulb</a><br>(Make sure to check your sockets for the right types)</li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img style="padding: 20px;" src="/assets/images/ha/hardware/ikea_gu10.jpg" alt="Ikea Tradfri GU10 dimmable led"></div>
  <div class="hw-info">
    <h4>Ikea Tradfri GU10 dimmable led</h4>
    <p>What can you do wrong with a €7 smart light? Not much. These lights are very good as a basic lights for rooms that do not need more than dimming. I did have some problems with some of these though, like flickering when they were off or not wanting to connect to my hub.</p>
    <p>The Tradfri hub is not required as it connects to my <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Great entry-level light. One of the cheapest Zigbee lights available. Decent light quality. Good value for your money.</p>
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
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/hue_gu10.jpeg" alt="Philips Hue White Ambience GU10"></div>
  <div class="hw-info">
    <h4>Philips Hue White Ambience GU10</h4>
    <p>Highest quality GU10 Zigbee lights I found so far. Excellent dimming capabilities (great for night lights) and a wide color range. If they would have been cheaper I would have bought more of these.</p>

    <div class="review">
      <p><b>Pros:</b> Superb dimming capabilities. Nice color temperature range.</p>
      <p><b>Cons:</b> More expensive than alternatives.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2W0NouR" rel="nofollow">Hue GU10</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img style="padding: 20px;" src="/assets/images/ha/hardware/ikea_gu10.jpg" alt="Ikea Tradfri GU10 dimmable led + color temp"></div>
  <div class="hw-info">
    <h4>Ikea Tradfri GU10 dimmable led + color temp</h4>
    <p>Double the price of the simple Tradfri light but includes adds color temperature. The range of temperatures and the dimming capabilties are still not great, but the lights have a very good value for the price. If you're not to picky for light quality, these lights are a great starter-buy.</p>
    <p>The Tradfri hub is not required as it connects to my <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

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
## Buttons and switches

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/hue_dimmer.jpg" alt="Philips Hue Smart Dimmer Switch"></div>
  <div class="hw-info">
    <h4>Philips Hue Smart Dimmer Switch</h4>
    <p>A four-button wireles switch that is often present in the starter packs of Philips Hue. Its intended use is to dim lights, however I use it as a remote for my Sonos-powered music system. Using Deconz and Node-RED I mapped the single buttons to music functions: shuffle, volume and skipping songs.</p>

    <div class="review">
      <p><b>Pros:</b> Four buttons, wall mount using magnets.</p>
      <p><b>Cons:</b> Labels on the buttons (can be a pro or con). Bit more expensive than a single Xiaomi button.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2WEml8Q" rel="nofollow">Hue Dimmer Switch</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/WXKG11LM.jpg" alt="Xiaomi Aqara wireless switch (WXKG11LM)"></div>
  <div class="hw-info">
    <h4>Xiaomi Aqara wireless switch (WXKG11LM)</h4>
    <p>Very useful and cheap (around €7) switch with a single button. I have spread several of these around my house controlling a wide range of functions. They are especially usefull to add a simple light switch to rooms.</p>
    <p>The Xiaomi hub is not required as it connects to my <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Small form factor. Good price.</p>
      <p><b>Cons:</b> Not available locally.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought on various websites. Usually cheapest on Gearbest or AliExpress.</li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a> or <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/WXKG01LM.jpg" alt="Xiaomi Aqara wireless switch (WXKG01LM)"></div>
  <div class="hw-info">
    <h4>Xiaomi Aqara wireless switch (WXKG01LM)</h4>
    <p>Comparable to the other switch (see above), but this one has a bit larger touch area. I use one in my kitchen as I can activate this switch with my elbows which is usefull during cooking. Its a bit more espensive though, usually around €9.</p>
    <p>The Xiaomi hub is not required as it connects to my <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Larger touch area.</p>
      <p><b>Cons:</b> Not available locally. Bit more expensive than WXKG11LM.</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li>Can be bought on various websites. Usually cheapest on Gearbest or AliExpress.</li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a> or <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a></li>
    </ul>
  </div>
</div>

<a name="dashboards"></a>
## Dashboards

A tablet-powerd dashboard is a great way of interacting with your house. I use it as the main control panel that gives access to the most important features and settings. It's also a very convenient way of giving guests access to your smart home system without having them to install an app or browsing to a website.

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/fire_tablet.jpg" alt="Amazon Fire Tablet"></div>
  <div class="hw-info">
    <h4>Amazon Fire Tablet</h4>
    <p>I use a basic Fire 7 tablet from Amazon for my dashboard. In combination with the <a href="https://www.ozerov.de/fully-kiosk-browser/">Fully Kiosk Browser</a> it's a really conventient way of controling my smart home. Fire OS (what runs on these tablets) can be a bit limiting but, for me, is enough for running a dashboard.</p>

    <div class="review">
      <p><b>Pros:</b> Good price.</p>
      <p><b>Cons:</b> Not the fastests tablets. Not available in all countries. FireOS can be restrictive.</p>
    </div>

  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2WFJmIx" rel="nofollow">Fire Tablet</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://www.ozerov.de/fully-kiosk-browser/">Fully Kiosk Browser</a></li>
    </ul>
  </div>
</div>

<a name="plugs"></a>
## Plugs

Smart plugs are an easy way to make dumb devices a bit smarter. For example: I use one to control the charger of my wall tablet and a second one to control my (non-smart) TV.

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/osram_plug.jpg" alt="OSRAM Smart+ Plug (Sylvania in the US)"></div>
  <div class="hw-info">
    <h4>OSRAM Smart+ Plug (Sylvania in the US)</h4>
    <p>Simple plug that I use for adding on/off control to non-smart devices. I've only tested the EU OSRAM version, in the US this brand is available under the Sylvania name.</p>
    <p>Connects to <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a>. An alternative is to run <a href="https://github.com/Koenkk/zigbee2mqtt">Zigbee2mqtt</a>.</p>

    <div class="review">
      <p><b>Pros:</b> Good value for your money. Good zigbee meshing capabilities.</p>
      <p><b>Cons:</b> No power measurement (at least in Deconz).</p>
    </div>
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2UBNGXq" rel="nofollow">OSRAM Plug (EU)</a></li>
      <li><a class="btn btn-info" href="https://amzn.to/2G93ZYz" rel="nofollow">Sylvania Plug (US)</a></li>
    </ul>
  </div>
</div>

<a name="controllers-v1"></a>
## My original setup (v1)

My first smart home setup consisted of Home Assistant, App Daemon and Node-RED are all running on a Raspberry Pi. Two other Pis, one for Deconz and one for PiHole, completed the set. While I could have ran all these services on a single device (like a NUC), I wanted to start small with a single Pi, and I have extended it since then. Currently, the Raspberry Pis have been replaced by a single Intel NUC.

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/raspberrypi.jpg" alt="Raspberry Pi 3B+"></div>
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
      <li><a class="btn btn-info" href="https://amzn.to/2sKF2Kq" rel="nofollow">Raspberry Pi 3B+</a></li>
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
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/conbee.jpg" alt="Conbee"></div>
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
      <li><a class="btn btn-info" href="https://amzn.to/2sKF2Kq" rel="nofollow">Raspberry Pi 3B+</a></li>
      <li><a class="btn btn-info" href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a></li>
      <li><a class="btn btn-info" href="https://amzn.to/2sPKzzm" rel="nofollow">RaspBee</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://github.com/dresden-elektronik/deconz-rest-plugin">Deconz</a></li>
    </ul>
  </div>
</div>

<div class="hw-row">
  <div class="hw-image"><img class="lazyload" data-src="/assets/images/ha/hardware/raspberrypi.jpg" alt="Raspberry Pi 3B+"></div>
  <div class="hw-info">
    <h4>Raspberry Pi B+ &amp; Pi-hole</h4>
    <p>Separate (older) Pi to run Pi-hole. I'm deliberately running this on a separate Pi to not interfere with my internet connection when tinkering with the other systems.</p>
    <img class="lazyload" data-src="/assets/images/ha/hardware/pi-hole-logo.png">
  </div>
  <div class="hw-source">
    <h5>Hardware:</h5>
    <ul>
      <li><a class="btn btn-info" href="https://amzn.to/2sKF2Kq" rel="nofollow">Raspberry Pi 3B+</a></li>
    </ul>
    <h5>Software:</h5>
    <ul>
      <li><a href="https://pi-hole.net/">Pi-hole</a></li>
    </ul>

  </div>
</div>
