---
layout: post
title:  "Setting up Home Automation with Docker Compose: Home Assistant, Node-RED, and more"
date:   2019-10-17 14:46
categories: blog tech
tags: [home automation, home assistant, docker]
published: true
description: "Docker-compose is a convenient way to setup and configure your home automation system. In this post, I describe my setup and the configuration needed to run the containers."
include_ha_series: true
lazyload: true
---


<figure>
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="610" height="145" id="svg2">
  <defs id="defs6">
    <clipPath id="clipPath8">
      <path d="m 76,2 0,46 -22,0 0,23 -18.419263,0 c -0.07818,0.665694 -0.141485,1.332869 -0.205737,2 -1.151162,12.530963 1.036422,24.087546 6.0625,33.96875 L 43.125,110 c 1.011403,1.81678 2.191241,3.52297 3.4375,5.1875 1.244725,1.66248 1.685716,2.58262 2.46875,3.6875 C 62.319911,133.81083 82.129473,141 105,141 155.64836,141 198.63299,118.56201 217.65625,68.15625 231.15302,69.54122 244.09968,66.080358 250,54.5625 240.60137,49.138835 228.52163,50.877226 221.5625,54.375 L 240,2 168,48 145,48 145,2 z" id="path10"/>
    </clipPath>
  </defs>
  <path d="m 467.82,113.24092 -0.0422,-25.557862 -0.12687,-45.65718 m 25.85406,19.67617 -25.72712,25.98101 25.85407,25.642492 M 321.28547,88.021573 c 0.12417,-5.480933 -1.46904,-11.08143 -4.69689,-15.613994 -4.65126,-6.53132 -12.17919,-10.9904 -20.43783,-11.08636 -0.55059,0 -1.09558,0 -1.65026,0.04225 -3.26481,0.2017 -6.42662,0.655378 -9.22453,1.819517 -18.40057,7.656 -21.66082,33.207962 -6.13558,44.768575 13.44474,10.01139 33.00155,5.92365 39.77549,-9.351466 1.43144,-3.227887 2.3696,-7.297132 2.3696,-10.578554 l 0,-46.207236 M 445.437,64.367851 c -3.80993,-2.4618 -8.25456,-3.349942 -12.65199,-3.342833 -0.47683,0 -0.96708,0.02383 -1.39637,0.04225 -12.71288,0.54677 -24.50001,9.530355 -24.50001,26.95424 0,20.6003 22.08809,31.71844 38.59069,22.00346 m 74.13473,-2.24266 c 13.00207,-11.1375 39.05614,-33.47058 39.05614,-33.47058 0,0 -0.94989,-1.797148 -1.56563,-2.623492 -5.25739,-7.055515 -13.28929,-10.5786 -21.74957,-10.578627 -20.90871,0 -36.58155,27.0365 -15.74094,46.6727 1.44301,1.35961 3.42523,2.42453 5.62781,3.34283 7.64747,3.18836 18.11655,2.92685 23.78066,-1.26943 M 364.02,61.194275 c -0.59271,0.01083 -1.18194,0.07366 -1.7772,0.08463 -15.85475,0.291353 -27.28615,16.759178 -23.82298,32.031962 3.37478,14.882963 19.63403,23.695883 33.68222,18.829883 16.35859,-4.28927 23.03061,-24.888756 14.04836,-38.802254 -4.9126,-7.60964 -13.23925,-12.3132 -22.1304,-12.14422 z m 240.72631,0.507772 c -6.42012,0.0172 -12.67273,2.265815 -17.30656,6.601038 -7.30767,6.03132 -8.89448,13.64741 -8.80139,23.2729 l 0.21157,21.876522" id="path12" style="fill:none;stroke:#394d54;stroke-width:10.5;stroke-linecap:round;stroke-linejoin:round"/>
  <path d="m 147.4876,45.732 22.866,0 0,23.37473 11.56177,0 c 5.33905,0 10.83073,-0.95117 15.887,-2.66444 2.48448,-0.84244 5.27317,-2.01479 7.72392,-3.4892 -3.22785,-4.21436 -4.87579,-9.53574 -5.36101,-14.78106 -0.65874,-7.13426 0.78032,-16.42042 5.60897,-22.004216 l 2.40362,-2.780117 2.8642,2.302393 c 7.21138,5.79374 13.27612,13.88934 14.3451,23.11819 8.68312,-2.55411 18.87759,-1.95 26.53135,2.46735 l 3.14002,1.81182 -1.65276,3.2257 C 246.93289,68.946524 233.40077,72.859896 220.17071,72.167411 200.37356,121.4758 157.2729,144.82 105.01356,144.82 c -26.998899,0 -51.769845,-10.09272 -65.875552,-34.04693 -0.827018,-1.48798 -1.535233,-3.0439 -2.286326,-4.57212 C 32.083548,95.656747 30.499883,84.105687 31.574226,72.564267 l 0.32241,-3.457072 19.552937,0 0,-23.37473 22.866,0 0,-22.866 45.732,0 0,-22.866 27.43967,0 0,45.732" id="path14" style="fill:#394d54"/>
  <g clip-path="url(#clipPath8)" id="g16">
    <g id="g18">
      <g transform="translate(0,-22.866)" id="g20">
        <path d="m 123.85901,3.8110794 19.81751,0 0,19.8169706 -19.81751,0 z" id="path22" style="fill:#00acd3"/>
        <path d="m 123.85901,26.676485 19.81751,0 0,19.818043 -19.81751,0 z" id="path24" style="fill:#20c2ef"/>
        <path d="m 126.29235,21.976904 0,-16.5157492 m 2.97185,16.5157492 0,-16.5157492 m 3.00184,16.5157492 0,-16.5157492 m 3.00344,16.5157492 0,-16.5157492 m 3.00292,16.5157492 0,-16.5157492 m 2.97131,16.5157492 0,-16.5157492" id="path26" style="stroke:#394d54;stroke-width:1.56"/>
        <use transform="translate(0,22.866)" id="use28" xlink:href="#path26"/>
      </g>
      <use transform="matrix(1,0,0,-1,22.866,4.572651)" id="use30" xlink:href="#g20"/>
    </g>
    <use transform="translate(-91.464,45.732)" id="use32" xlink:href="#g18"/>
    <use transform="translate(-45.732,45.732)" id="use34" xlink:href="#g18"/>
    <use transform="translate(0,45.732)" id="use36" xlink:href="#g18"/>
  </g>
  <path d="m 221.57014,54.379649 c 1.53332,-11.915247 -7.38383,-21.274779 -12.91407,-25.71836 -6.37269,7.367765 -7.36295,26.677556 2.63498,34.807431 -5.57952,4.956117 -17.33731,9.448435 -29.37574,9.448435 L 34,72.917155 C 32.829255,85.484184 34,146 34,146 l 217,0 -0.98657,-91.424 c -9.39863,-5.423665 -21.48419,-3.694326 -28.44332,-0.196552" clip-path="url(#clipPath8)" id="path38" style="fill:#17b5eb"/>
  <path d="m 34,89 0,57 217,0 0,-57" clip-path="url(#clipPath8)" id="path40" style="fill-opacity:0.17"/>
  <path d="M 111.23736,140.88997 C 97.697741,134.4648 90.265707,125.73081 86.130611,116.19562 L 45,118 l 21,28 45.23736,-5.11003" clip-path="url(#clipPath8)" id="path42" style="fill:#d4edf1"/>
  <path d="m 222.5,53.9375 0,0.03125 c -20.86119,26.889144 -50.78312,50.37872 -82.90625,62.71875 -28.65478,11.00767 -53.638381,11.06039 -70.875,2.21875 -1.85607,-1.04832 -3.675701,-2.21152 -5.5,-3.3125 C 50.582097,106.76175 43.464274,92.152308 44.0625,72.90625 L 34,72.90625 34,146 l 217,0 0,-96 -25,0 z" clip-path="url(#clipPath8)" id="path44" style="fill-opacity:0.085"/>
  <path d="m 45.625,117.03125 c 14.165153,0.77531 29.28245,0.91433 42.46875,-3.21875" id="path46" style="fill:none;stroke:#394d54;stroke-width:3.4;stroke-linecap:round"/>
  <path d="m 102.17024,106.95926 c 0,3.01898 -2.447529,5.46651 -5.466508,5.46651 -3.019514,0 -5.467581,-2.44753 -5.467581,-5.46651 0,-3.01897 2.448067,-5.46758 5.467581,-5.46758 3.018979,0 5.466508,2.44861 5.466508,5.46758 z" id="path48" style="fill:#d4edf1"/>
  <path d="m 98.121372,103.30778 c -0.477188,0.27582 -0.800133,0.79264 -0.800133,1.3839 0,0.88261 0.715514,1.59706 1.598125,1.59706 0.604653,0 1.130046,-0.3358 1.401576,-0.83174 0.19173,0.4622 0.29831,0.96991 0.29831,1.50226 0,2.16208 -1.752907,3.91498 -3.915518,3.91498 -2.162075,0 -3.91605,-1.7529 -3.91605,-3.91498 0,-2.16314 1.753975,-3.91658 3.91605,-3.91658 0.500218,0 0.977406,0.0943 1.41764,0.2651 z" id="path50" style="fill:#394d54"/>
  <path d="m 0,90.162343 254.32743,0 c -5.53774,-1.404786 -17.521,-3.302293 -15.54477,-10.559732 -10.06915,11.651749 -34.35274,8.174326 -40.4812,2.428786 -6.82471,9.89831 -46.55451,6.135967 -49.32553,-1.575096 -8.55565,10.04077 -35.06718,10.04077 -43.62336,0 -2.77209,7.711063 -42.501357,11.473406 -49.326595,1.575096 C 49.897506,87.776937 25.616067,91.25436 15.545841,79.602611 17.522075,86.86005 5.5388117,88.757557 0,90.162343" id="path52" style="fill:#394d54"/>
</svg>
</figure><br>

Recently, I migrated my whole home automation setup from a group of Raspberry Pis to an Intel NUC; specifically the <a href="https://amzn.to/2BkXyNK" rel="nofollow">Intel NUC8i5BEK</a>. Due to an increasingly larger set of devices, a single Pi for running Home Assistant and Node-RED did not cut it anymore. See my post on [my hardware setup](/blog/tech/home-assistant-smart-home-hardware-setup/) for more information.

With the introduction of the Intel Nuc to my setup, the way I configured my system also changed. Previously, I used Hass.io for managing all services. With the new NUC, I wanted to be more in control. I ended up adopting Docker and Docker Compose for my setup.

During the migration of my setup, it took quite some time to figure out the configurations for all services. In this blog post, I share the configurations I eventually came up with, and which now power my system. I now have running containers for Home Assistant, Node-RED, AppDaemon, MariaDB, VS Code, and Deconz.

Any questions about these setups? Feel free to add a question in the comments. Tips to improve it, those are very welcome too!

**Table of contents**

- [Use of the .env file](#env)
- [Note on volumes](#volumes)
- [Docker compose for **Home Assistant**](#home-assistant)
- [Docker compose for **MariaDB**](#mariadb)
- [Docker compose for **Conbee / Deconz**](#deconz)
- [Docker compose for **Node-RED**](#nodered)
- [Docker compose for **AppDaemon**](#appdaemon)
- [Docker compose for **VS Code**](#vscode)
- [docker-compose.yaml overview](#overview)

<a name="env"></a>
## Use of the .env file

Al my configurations are pushed to Github as a way of back up. It's not really desirable to commit secrets (passwords, tokens, etc.), so you don't want these in your config file. Luckily, docker-compose can read these from an `.env` file. In all the examples below, I assume that you have a `.env` file with the required variables.

<a name="volumes"></a>
## Note on volumes

Most of the docker containers use volumes to store persistent data. Without these volumes, all data and configuration would be lost if you restart one of the containers. Make sure to check the volumes config of each configuration block and update accordingly to your liking.

I store all my configuration (e.g., al volumes) in a central directory like `~/homeautomation-config`. This directory can then be easily backed up on a remote device.  

<a name="home-assistant"></a>
## Docker compose for Home Assistant

<figure style="max-width: 200px; text-align: left;">
{% include assets/ha-logo.html %}
</figure><br>

The Home Assistant docker is the main container of my smart home setup. Most configuration is done within HA itself, so it's a matter of spinning up the container. I use MariaDB for storing all event data, so that container needs to start first. I also make sure that my Zigbee hub is running before starting HA.

<dl>
  <dt>Website:</dt>
  <dd><a href="https://www.home-assistant.io/">Home Assistant</a></dd>
  <dt>ENV variables:</dt>
  <dd>
    <ul>
      <li><code>LOCAL_USER</code>: (Optional) Map the docker user to your user id. This ensures that files can be edited without root access. Especially useful in combination with the VSCode server image.</li>
    </ul>
  </dd>
</dl>

```yaml
# HomeAssistant
homeassistant:
  container_name: home-assistant
  image: homeassistant/home-assistant
  volumes:
    # Local path where your home assistant config will be stored
    - <local config path>:/config
    - /etc/localtime:/etc/localtime:ro
  restart: unless-stopped
  network_mode: host
  depends_on:
    # MariaDB is optional (only if you would like to use a different database for HA).
    - mariadb
    # Deconz is optional (only if you use the deconz Zigbee hub).
    - deconz
  user: "${LOCAL_USER}:${LOCAL_USER}"
```

<a name="mariadb"></a>
## Docker compose for Database using MariaDB

<figure style="text-align: left;">
<svg xmlns="http://www.w3.org/2000/svg" width="414.62" height="129.41"><defs><linearGradient id="a"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="b"><stop offset="0" stop-color="#8b5e3c"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="c"><stop offset="0" stop-color="#8b5e3c"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="d"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="e"><stop offset="0" stop-color="#543824"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="f"><stop offset="0" stop-color="#543824"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="g"><stop offset="0" stop-color="#c49a6c"/><stop offset="1" stop-color="#c49a6c" stop-opacity="0"/></linearGradient><linearGradient id="h"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="i"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="k"><stop offset="0" stop-color="#8b5e3c"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="l"><stop offset="0" stop-color="#8b5e3c"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="m"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="n"><stop offset="0" stop-color="#543824"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="q"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="j"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="o"><stop offset="0" stop-color="#543824"/><stop offset="1" stop-color="#8b5e3c" stop-opacity="0"/></linearGradient><linearGradient id="p"><stop offset="0" stop-color="#c49a6c"/><stop offset="1" stop-color="#c49a6c" stop-opacity="0"/></linearGradient><linearGradient id="r"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><g font-size="58.79" font-weight="400" fill="#a57242" font-family="STHeiti"><path d="M330.93 67.33v31.22H327V93.2c-3.56 4.27-7.64 6.4-12.23 6.4-4.58 0-8.46-1.62-11.64-4.87a16.4 16.4 0 0 1-4.7-11.7c0-4.55 1.59-8.43 4.76-11.64a15.38 15.38 0 0 1 11.4-4.88c5.1 0 9.24 2.17 12.41 6.52v-5.7h3.94m-3.7 15.76c0-3.57-1.2-6.57-3.59-9a11.8 11.8 0 0 0-8.82-3.7c-3.45 0-6.37 1.27-8.76 3.82a12.51 12.51 0 0 0-3.58 8.93 12.6 12.6 0 0 0 3.64 9 11.7 11.7 0 0 0 8.7 3.76c3.41 0 6.33-1.21 8.76-3.64a12.44 12.44 0 0 0 3.65-9.17M339.91 98.55V56.34h8.76c6 0 10.39.45 13.17 1.35 2.82.86 5.25 2.25 7.29 4.17 2.04 1.88 3.6 4.2 4.7 6.94a25.87 25.87 0 0 1 1.65 9.64c0 3.65-.86 7.1-2.59 10.35-1.68 3.21-4 5.64-6.94 7.29-2.9 1.64-7.09 2.47-12.58 2.47h-13.46m4.06-4h4.88c5.1 0 8.78-.25 11.05-.76 2.31-.51 4.33-1.51 6.05-3a15.04 15.04 0 0 0 3.94-5.53c.9-2.15 1.36-4.62 1.36-7.4 0-2.79-.53-5.36-1.6-7.7a14.85 14.85 0 0 0-11.22-8.89c-2.59-.54-6.4-.82-11.46-.82h-3v34.1M285.48 58.63a3.32 3.32 0 0 1 3.3-3.35c.93 0 1.72.33 2.34 1 .67.62 1 1.4 1 2.35 0 .9-.33 1.68-1 2.35-.62.63-1.4.94-2.35.94-.9 0-1.68-.33-2.35-1a3.25 3.25 0 0 1-.94-2.3m1.3 8.7h4.05v31.23h-4.06V67.33M173.66 98.55l6-42.21h.65l17.16 34.62 17.05-34.62h.65l6.06 42.2h-4.18l-4.11-30.21L198 98.55h-1.05l-15.11-30.46-4.12 30.46h-4.06M259.83 67.33v31.22h-3.94V93.2c-3.56 4.27-7.64 6.4-12.23 6.4-4.58 0-8.46-1.62-11.64-4.87a16.4 16.4 0 0 1-4.7-11.7c0-4.55 1.59-8.43 4.76-11.64a15.38 15.38 0 0 1 11.4-4.88c5.1 0 9.24 2.17 12.41 6.52v-5.7h3.94m-3.7 15.76c0-3.57-1.2-6.57-3.59-9a11.8 11.8 0 0 0-8.82-3.7c-3.45 0-6.37 1.27-8.76 3.82a12.51 12.51 0 0 0-3.58 8.93 12.6 12.6 0 0 0 3.64 9 11.7 11.7 0 0 0 8.7 3.76c3.41 0 6.33-1.21 8.76-3.64a12.44 12.44 0 0 0 3.65-9.17M266.63 67.33h4.12v4.53c1.1-1.85 2.16-3.2 3.17-4.06a5.37 5.37 0 0 1 3.47-1.3c1.3 0 2.59.36 3.88 1.06l-2.11 3.41a3.5 3.5 0 0 0-1.83-.52c-1.21 0-2.37.62-3.46 1.88a12.07 12.07 0 0 0-2.36 4.88c-.5 1.96-.76 5.54-.76 10.76v10.58h-4.12V67.33M384.28 56.34h8.35c4.43 0 7.78.9 10.05 2.7 2.32 1.76 3.47 4.31 3.47 7.64a9.76 9.76 0 0 1-5.4 8.82c2.9.94 5.09 2.35 6.58 4.23a10.3 10.3 0 0 1 2.3 6.7c0 3.5-1.28 6.4-3.83 8.7-2.55 2.28-5.84 3.42-9.88 3.42h-11.64V56.34m4.18 4.11v13.52h2.4c3.7 0 6.43-.59 8.24-1.76 1.8-1.18 2.7-3.02 2.7-5.53 0-4.15-2.82-6.23-8.46-6.23h-4.88m0 17.76v16.22h5.23c3.02 0 5.23-.3 6.64-.88a8.33 8.33 0 0 0 3.53-2.82c.9-1.3 1.35-2.6 1.35-3.94 0-1.33-.25-2.5-.76-3.53a7.85 7.85 0 0 0-2.3-2.7 9.91 9.91 0 0 0-3.58-1.77c-1.37-.39-3.96-.58-7.76-.58h-2.35"/></g><path d="M180.87 5c-2.78.1-1.9.9-7.9 2.37-6.07 1.5-13.47 1.03-20 3.77-19.5 8.18-23.4 36.12-41.13 46.13-13.24 7.48-26.6 8.08-38.62 11.84-7.9 2.48-16.54 7.56-23.69 13.72-5.55 4.79-5.7 9-11.5 15-6.2 6.42-24.67.1-33.03 9.94 2.7 2.72 3.87 3.49 9.19 2.78-1.1 2.08-7.59 3.84-6.32 6.9 1.34 3.23 17 5.42 31.25-3.18 6.64-4 11.92-9.78 22.25-11.16 13.37-1.78 28.78 1.14 44.25 3.38-2.3 6.84-6.9 11.39-10.59 16.84-1.14 1.23 2.3 1.37 6.22.63 7.06-1.75 12.14-3.15 17.47-6.25 6.54-3.81 7.53-13.58 15.56-15.7 4.47 6.88 16.64 8.5 24.19 3-6.63-1.87-8.46-15.97-6.22-22.18 2.12-5.88 4.2-15.29 6.34-23.06 2.3-8.35 3.14-18.87 5.9-23.13 4.18-6.4 8.79-8.6 12.79-12.2 4-3.6 7.66-7.12 7.54-15.38-.04-2.66-1.42-4.14-3.95-4.06z" fill="#002b64" fill-rule="evenodd"/><path d="M10.75 116.87c10.15 1.45 16.32 0 24.46-3.54 6.93-3 13.63-9.2 21.81-11.83 12.02-3.85 25.2 0 38.05.78 3.13.19 6.24.19 9.31-.15 4.79-2.94 4.69-13.94 9.35-14.95-.14 15.44-6.47 24.7-13.09 33.65 13.95-2.47 22.3-10.54 27.94-21.31a78.73 78.73 0 0 0 4.47-10.47c2 1.53.86 6.2 1.86 8.72 9.61-5.35 15.12-17.57 18.76-29.92 4.22-14.3 5.94-28.78 8.66-33.02 2.66-4.13 6.79-6.67 10.56-9.32 4.28-3 8.1-6.13 8.76-11.86-4.52-.42-5.56-1.47-6.23-3.74-2.26 1.27-4.34 1.55-6.7 1.62-2.03.06-4.27-.03-7 .25-22.63 2.32-25.5 27.26-40.01 41.4a34.02 34.02 0 0 1-3.4 2.89c-5.08 3.78-11.31 6.49-17.04 8.68-9.28 3.54-18.1 3.8-26.8 6.85a80.24 80.24 0 0 0-18.12 9.1c-1.32.9-2.55 1.81-3.69 2.74-3.08 2.52-5.1 5.31-7.05 8.19-2.02 2.96-3.97 6.01-6.94 8.92-4.8 4.72-22.77 1.38-29.1 5.76a5.16 5.16 0 0 0-1.64 1.77c3.45 1.57 5.76.6 9.73 1.05.52 3.76-8.2 6-6.9 7.74z" fill="#c49a6c"/><path d="M147.84 89.73c.27 4.32 2.78 12.9 4.99 14.98-4.34 1.05-11.81-.69-13.73-3.75.99-4.42 6.11-8.46 8.74-11.23z" clip-rule="evenodd" fill="#c49a6c" fill-rule="evenodd"/><path d="M154.2 21.14c3.2 2.78 9.92.54 8.71-4.99-4.97-.41-7.86 1.28-8.72 4.99z" clip-rule="evenodd" fill="#002b64" fill-rule="evenodd"/><path d="M176.52 14.67c-.85 1.79-2.48 4.09-2.48 8.64 0 .78-.6 1.32-.6.11.04-4.44 1.22-6.37 2.47-8.9.58-1.03.93-.6.61.15z" fill="#002b64"/><path d="M175.66 14c-1 1.7-3.42 4.81-3.82 9.34-.07.78-.7 1.26-.61.06.44-4.42 2.37-7.2 3.84-9.6.66-.98.98-.52.6.2zM174.88 13.1c-1.14 1.62-4.87 5.35-5.65 9.84-.14.76-.8 1.2-.61 0 .8-4.37 4.02-7.8 5.68-10.08.75-.92 1.02-.44.58.24zM174.18 12.1c-1.36 1.45-5.8 6.2-7.2 10.54-.24.74-.97 1.07-.6-.08 1.4-4.22 5.3-8.76 7.26-10.78.87-.8 1.08-.29.54.33z" fill="#002b64"/></svg>
</figure>

I use MariaDB as my main database for Home Assistant. HA gets its own user account to access the db.

<dl>
  <dt>Website:</dt>
  <dd><a href="https://mariadb.org/">MariaDB</a></dd>
  <dt>ENV variables:</dt>
  <dd>
    <ul>
      <li><code>MYSQL_ROOT_PASSWORD</code>: Root password for the service.</li>
      <li><code>HA_MYSQL_PASSWORD</code>: Password that home assistant will use to connect with the db.</li>
      <li><code>LOCAL_USER</code>: (Optional) Map the docker user to your user id. This ensures that files can be edited without root access.</li>
    </ul>
  </dd>
</dl>

```yaml
# MariaDb
mariadb:
  image: mariadb/server:10.3
  container_name: mariadb
  restart: unless-stopped
  environment:
    MYSQL_ROOT_PASSWORD: "${MYSQL_ROOT_PASSWORD}"
    MYSQL_DATABASE: ha_db
    MYSQL_USER: homeassistant
    MYSQL_PASSWORD: "${HA_MYSQL_PASSWORD}"
  user: "${LOCAL_USER}:${LOCAL_USER}"
  volumes:
    # Local path where the database will be stored.
    - <local db path>:/var/lib/mysql
  ports:
    - "3306:3306"
```

<a name="deconz"></a>
## Docker compose for Zigbee hub using Deconz

<figure style="text-align: left; max-width: 300px;"><img class="lazyload" data-src="/assets/images/ha/hardware/conbee2.jpg"></figure>

To control my devices, I use the <a href="https://amzn.to/2po4t61" rel="nofollow">ConBee</a> USB ZigBee hub from Dresden Elektroniks. It's a great device with a vast list of compatible devices. Luckily, there is a Docker image that can be used to run their software. It even has support for viewing the mesh network through VNC.

<dl>
  <dt>Hardware:</dt>
  <dd><a href="https://amzn.to/2po4t61" rel="nofollow">Conbee 2</a> (I'm using the Conbee 1, but the v2 is slightly improved and should be bought from now on.)</dd>
  <dt>Website:</dt>
  <dd><a href="https://phoscon.de/en/conbee/install#docker">Conbee 1</a> or <a href="https://phoscon.de/en/conbee2/install#docker">Conbee 2</a></dd>
  <dt>ENV variables:</dt>
  <dd>
    <ul>
      <li><code>VNC_PASSWORD</code>: Password to use when connecting to the VNC server (for viewing the mesh network).</li>
    </ul>
  </dd>
  <dt>Additional notes:</dt>
  <dd>
    <ul>
      <li>You need to map the right USB device to the container. For the Conbee 2 the device mapping is slightly different. You can use `/dev/ttyACM0` instead of `dev/ttyUSB0`.</li>
    </ul>
  </dd>
</dl>

```yaml
# Deconz
deconz:
  container_name: deconz
  image: marthoc/deconz
  restart: unless-stopped
  network_mode: host
  environment:
    # You can access Deconz at this port
    DECONZ_WEB_PORT: 8080
    DECONZ_WS_PORT: 8088

    # Set VNC_MODE to 0 to disable it completely
    DECONZ_VNC_MODE: 1
    DECONZ_VNC_PORT: 5900
    DECONZ_VNC_PASSWORD: "${VNC_PASSWORD}"
  volumes:
    - /etc/localtime:/etc/localtime:ro
    - /etc/timezone:/etc/timezone:ro
    # Replace <local path> with a path where all deconz config will be stored.
    - <local path>:/root/.local/share/dresden-elektronik/deCONZ
  devices:
    - "/dev/ttyUSB0:/dev/ttyUSB0"
```

<a name="nodered"></a>
## Docker compose for Node-RED

<figure style="max-width: 200px; text-align: left;">
{% include assets/node-red-logo.html %}
</figure><br>

Node-RED powers most of the automations in my smart home. After setting up the container, you can install extensions and configure the connection between Home Assistant and Node-RED.

<dl>
  <dt>Website:</dt>
  <dd><a href="https://nodered.org/docs/getting-started/docker#quick-start">Node-RED</a></dd>
  <dt>ENV variables:</dt>
  <dd>
    <ul>
      <li><code>LOCAL_USER</code>: (Optional) Map the docker user to your user id. This ensures that files can be edited without root access. Especially useful in combination with the VSCode server image.</li>
    </ul>
  </dd>
  <dt>Additional notes:</dt>
  <dd>
    <ul>
      <li>When the Node-RED container is running, you can install the Home Assistant extension and connect Node-RED with HA. You only have to do this once. After the initial install, all configurations and extension are saved.</li>
      <li>The Home Assistant extension for Node-RED is <a href="https://flows.nodered.org/node/node-red-contrib-home-assistant-websocket">node-red-contrib-home-assistant-websocket</a>. You can install this extension within Node-RED by going to "Manage palette" in the menu.</a></li>
    </ul>
  </dd>
</dl>

```yaml
  # Node-RED
  nodered:
    container_name: nodered
    image: nodered/node-red
    ports:
      - "1880:1880"
    volumes:
      # Local path where all Node-RED config will be stored.
      - <local path>:/data
    depends_on:
      - homeassistant
    environment:
      TZ: "Europe/Amsterdam"
    user: "${LOCAL_USER}:${LOCAL_USER}"
    restart: unless-stopped
```

<a name="appdaemon"></a>
## Docker compose for AppDaemon

AppDaemon is a great way to create small Python-based scripts that can interface with Home Assistant. AppDaemon runs in its own container and needs a "long lived access token" from HA to communicate.

<dl>
  <dt>Website:</dt>
  <dd><a href="https://appdaemon.readthedocs.io/en/latest/">AppDaemon</a></dd>
  <dt>ENV variables:</dt>
  <dd>
    <ul>
      <li><code>SERVER_IP</code>: URL of Home Assistant.</li>
      <li><code>HA_APPDAEMON_KEY</code>: Long lived access token generated in Home Assistant.</li>
      <li><code>LOCAL_USER</code>: (Optional) Map the docker user to your user id. This ensures that files can be edited without root access. Especially useful in combination with the VSCode server image.</li>
    </ul>
  </dd>
</dl>

```yaml
appdaemon:
  container_name: appdaemon
  restart: unless-stopped
  image: acockburn/appdaemon:latest
  environment:
    HA_URL: "http://${SERVER_IP}:8123"
    TOKEN: "${HA_APPDAEMON_KEY}"
    DASH_URL: "http://${SERVER_IP}:5050"
  ports:
    - "5050:5050"
  volumes:
    # Set which local directory will contain all your app daemon configuration
    - <local config>:/conf
  depends_on:
    - homeassistant
  user: "${LOCAL_USER}:${LOCAL_USER}"
```

<a name="vscode"></a>
## Docker compose for VS Code Server

<figure style="text-align: left; max-width: 150px;">
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 234 235.1"><style>.st0{fill:#0179cb}</style><path class="st0" d="M83.3 143.9l-58 45.2L0 176.5V58.7L25.2 46l57.6 45.3L174 0l60 23.9v186.9l-59.7 24.3-91-91.2zm88.9 15.9V75.3l-54.6 42.3 54.6 42.2zM27.3 144.6L56 118.5 27.3 89.9v54.7z"/></svg>
</figure>

Not technically required for Home Assistant, but Visual Studio Code Server is a great way to add a remote IDE to your setup. When the container is running, you have access to a complete IDE within your browser.

<dl>
  <dt>Website:</dt>
  <dd><a href="https://github.com/cdr/code-server">cdr/code-server</a></dd>
  <dt>ENV variables:</dt>
  <dd>
    <ul>
      <li><code>VSCODE_PASSWORD</code>: Password you want to use with VS Code</li>
    </ul>
  </dd>
</dl>


```yaml
# Visual Studio code
vscode:
  container_name: vscode
  image: codercom/code-server:v2
  volumes:
    # Set <project dir> to the directory you want to open in VS Code.
    - <project dir>:/home/coder/project
    # <vs code config> should point to a local dir where vs code stores its data.
    - <vs code config dir>:/home/coder/.local/share/code-server
  ports:
    - "8443:8443"
  command: code-server --auth password --port 8443 --disable-telemetry /home/coder/project
  environment:
    PASSWORD: "${VSCODE_PASSWORD}"
  restart: unless-stopped
```

<a name="overview"></a>
## Complete docker compose file

For reference, the `.env` and `docker-compose.yaml` file:

**`.env`**
```
SERVER_IP= 0.0.0.0
HA_APPDAEMON_KEY=some long accces token
VSCODE_PASSWORD=password
LOCAL_USER=1000
VNC_PASSWORD=password
MYSQL_ROOT_PASSWORD=password
HA_MYSQL_PASSWORD=password
```


**`docker-compose.yaml`**
```yaml
version: '3'
services:
  # HomeAssistant
  homeassistant:
    container_name: home-assistant
    image: homeassistant/home-assistant
    volumes:
      # Local path where your home assistant config will be stored
      - <local config path>:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    network_mode: host
    depends_on:
      # MariaDB is optional (only if you would like to use a different database for HA).
      - mariadb
      # Deconz is optional (only if you use the deconz Zigbee hub).
      - deconz
    user: "${LOCAL_USER}:${LOCAL_USER}"

  # MariaDb
  mariadb:
    image: mariadb/server:10.3
    container_name: mariadb
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: "${MYSQL_ROOT_PASSWORD}"
      MYSQL_DATABASE: ha_db
      MYSQL_USER: homeassistant
      MYSQL_PASSWORD: "${HA_MYSQL_PASSWORD}"
    user: "${LOCAL_USER}:${LOCAL_USER}"
    volumes:
      # Local path where the database will be stored.
      - <local db path>:/var/lib/mysql
    ports:
      - "3306:3306"

  # Deconz
  deconz:
    container_name: deconz
    image: marthoc/deconz
    restart: unless-stopped
    network_mode: host
    environment:
      # You can access Deconz at this port
      DECONZ_WEB_PORT: 8080
      DECONZ_WS_PORT: 8088

      # Set VNC_MODE to 0 to disable it completely
      DECONZ_VNC_MODE: 1
      DECONZ_VNC_PORT: 5900
      DECONZ_VNC_PASSWORD: "${VNC_PASSWORD}"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      # Replace <local path> with a path where all deconz config will be stored.
      - <local path>:/root/.local/share/dresden-elektronik/deCONZ
    devices:
      - "/dev/ttyUSB0:/dev/ttyUSB0"

  # Node-RED
  nodered:
    container_name: nodered
    image: nodered/node-red
    ports:
      - "1880:1880"
    volumes:
      # Local path where all Node-RED config will be stored.
      - <local path>:/data
    depends_on:
      - homeassistant
    environment:
      TZ: "Europe/Amsterdam"
    user: "${LOCAL_USER}:${LOCAL_USER}"
    restart: unless-stopped

  # AppDaemon
  appdaemon:
    container_name: appdaemon
    restart: unless-stopped
    image: acockburn/appdaemon:latest
    environment:
      HA_URL: "http://${SERVER_IP}:8123"
      TOKEN: "${HA_APPDAEMON_KEY}"
      DASH_URL: "http://${SERVER_IP}:5050"
    ports:
      - "5050:5050"
    volumes:
      # Set which local directory will contain all your app daemon configuration
      - <local config>:/conf
    depends_on:
      - homeassistant
    user: "${LOCAL_USER}:${LOCAL_USER}"

  # Visual Studio code
  vscode:
    container_name: vscode
    image: codercom/code-server:v2
    volumes:
      # Set <project dir> to the directory you want to open in VS Code.
      - <project dir>:/home/coder/project
      # <vs code config> should point to a local dir where vs code stores its data.
      - <vs code config dir>:/home/coder/.local/share/code-server
    ports:
      - "8443:8443"
    command: code-server --auth password --port 8443 --disable-telemetry /home/coder/project
    environment:
      PASSWORD: "${VSCODE_PASSWORD}"
    restart: unless-stopped
```
