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


<figure style="max-width: 100%;">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 610 145"><defs><clipPath id="a"><path d="M76 2v46H54v23H35.58c-.08.67-.14 1.33-.2 2-1.16 12.53 1.03 24.09 6.06 33.97l1.69 3.03a46.18 46.18 0 003.43 5.19c1.25 1.66 1.69 2.58 2.47 3.69C62.32 133.8 82.13 141 105 141c50.65 0 93.63-22.44 112.66-72.84 13.5 1.38 26.44-2.08 32.34-13.6-9.4-5.42-21.48-3.68-28.44-.19L240 2l-72 46h-23V2z"/></clipPath></defs><path d="M467.82 113.24l-.04-25.56-.13-45.65M493.5 61.7l-25.72 25.98 25.85 25.65M321.3 88.03a26.1 26.1 0 00-4.7-15.62c-4.65-6.53-12.18-11-20.44-11.09-.55 0-1.1 0-1.65.04-3.26.2-6.43.66-9.22 1.82-18.4 7.66-21.66 33.21-6.14 44.77 13.45 10.01 33 5.93 39.78-9.35a28.07 28.07 0 002.37-10.58v-46.2m124.15 22.55c-3.81-2.46-8.26-3.35-12.65-3.34-.48 0-.97.02-1.4.04-12.71.54-24.5 9.53-24.5 26.95 0 20.6 22.09 31.72 38.59 22m74.13-2.24l39.06-33.47s-.95-1.8-1.57-2.62c-5.25-7.06-13.28-10.58-21.75-10.58-20.9 0-36.58 27.04-15.74 46.67a18.71 18.71 0 005.63 3.35c7.65 3.18 18.12 2.92 23.78-1.27m-185-48.67c-.6.02-1.18.08-1.78.09-15.85.29-27.28 16.76-23.82 32.03 3.37 14.88 19.63 23.7 33.68 18.83 16.36-4.29 23.03-24.89 14.05-38.8-4.91-7.61-13.24-12.31-22.13-12.15zm240.73.51c-6.42.02-12.68 2.27-17.31 6.6-7.3 6.03-8.9 13.65-8.8 23.28l.21 21.87" fill="none" stroke="#394d54" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M147.49 45.73h22.86v23.38h11.57c5.33 0 10.83-.95 15.88-2.67a40.69 40.69 0 007.73-3.49c-3.23-4.21-4.88-9.53-5.36-14.78-.66-7.13.78-16.42 5.6-22l2.4-2.78 2.87 2.3c7.21 5.8 13.28 13.89 14.35 23.12 8.68-2.56 18.87-1.95 26.53 2.47l3.14 1.8-1.65 3.23c-6.48 12.64-20 16.55-33.24 15.86-19.8 49.3-62.9 72.65-115.16 72.65-27 0-51.77-10.1-65.87-34.05-.83-1.48-1.54-3.04-2.29-4.57-4.77-10.54-6.35-22.1-5.28-33.64l.33-3.45h19.55V45.73h22.87V22.87h45.73V0h27.44v45.73" fill="#394d54"/><g clip-path="url(#a)"><g id="d"><g transform="translate(0 -22.87)" id="c"><path d="M123.86 3.81h19.82v19.82h-19.82z" fill="#00acd3"/><path d="M123.86 26.68h19.82v19.81h-19.82z" fill="#20c2ef"/><path d="M126.3 21.98V5.46m2.96 16.52V5.46m3 16.52V5.46m3 16.52V5.46m3.01 16.52V5.46m2.97 16.52V5.46" id="b" stroke="#394d54" stroke-width="1.56"/><use transform="translate(0 22.87)" xlink:href="#b"/></g><use transform="matrix(1 0 0 -1 22.87 4.57)" xlink:href="#c"/></g><use transform="translate(-91.46 45.73)" xlink:href="#d"/><use transform="translate(-45.73 45.73)" xlink:href="#d"/><use transform="translate(0 45.73)" xlink:href="#d"/></g><path d="M221.57 54.38c1.53-11.92-7.38-21.28-12.91-25.72-6.38 7.37-7.37 26.68 2.63 34.8-5.58 4.96-17.34 9.46-29.37 9.46H34C32.83 85.48 34 146 34 146h217l-.99-91.42c-9.4-5.43-21.48-3.7-28.44-.2" clip-path="url(#a)" fill="#17b5eb"/><path d="M34 89v57h217V89" clip-path="url(#a)" fill-opacity=".17"/><path d="M111.24 140.89c-13.54-6.43-20.97-15.16-25.1-24.7L45 118l21 28 45.24-5.11" clip-path="url(#a)" fill="#d4edf1"/><path d="M222.5 53.94v.03c-20.86 26.89-50.78 50.38-82.9 62.72-28.66 11-53.64 11.06-70.88 2.22-1.86-1.05-3.68-2.22-5.5-3.32-12.64-8.83-19.76-23.44-19.16-42.68H34V146h217V50h-25z" clip-path="url(#a)" fill-opacity=".09"/><path d="M45.63 117.03c14.16.78 29.28.92 42.46-3.22" fill="none" stroke="#394d54" stroke-width="3.4" stroke-linecap="round"/><path d="M102.17 106.96a5.47 5.47 0 11-10.93 0 5.47 5.47 0 0110.93 0z" fill="#d4edf1"/><path d="M98.12 103.3a1.6 1.6 0 102.2 2.16 3.91 3.91 0 11-2.2-2.15zM0 90.16h254.33c-5.54-1.4-17.52-3.3-15.55-10.56-10.07 11.65-34.35 8.18-40.48 2.43-6.82 9.9-46.55 6.14-49.32-1.57-8.56 10.04-35.07 10.04-43.63 0-2.77 7.7-42.5 11.47-49.32 1.57-6.13 5.75-30.41 9.22-40.48-2.43C17.52 86.86 5.54 88.76 0 90.16" fill="#394d54"/></svg>
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.62 129.41"><path d="M330.93 67.33v31.22H327V93.2c-3.56 4.27-7.64 6.4-12.23 6.4-4.58 0-8.46-1.62-11.64-4.87a16.4 16.4 0 01-4.7-11.7c0-4.55 1.59-8.43 4.76-11.64a15.38 15.38 0 0111.4-4.88c5.1 0 9.24 2.17 12.41 6.52v-5.7h3.94m-3.7 15.76c0-3.57-1.2-6.57-3.59-9a11.8 11.8 0 00-8.82-3.7c-3.45 0-6.37 1.27-8.76 3.82a12.51 12.51 0 00-3.58 8.93 12.6 12.6 0 003.64 9 11.7 11.7 0 008.7 3.76c3.41 0 6.33-1.21 8.76-3.64a12.44 12.44 0 003.65-9.17m12.67 15.46V56.34h8.76c6 0 10.39.45 13.17 1.35 2.82.86 5.25 2.25 7.29 4.17a18.8 18.8 0 014.7 6.94 25.87 25.87 0 011.65 9.64c0 3.65-.86 7.1-2.59 10.35-1.68 3.21-4 5.64-6.94 7.29-2.9 1.64-7.09 2.47-12.58 2.47h-13.46m4.06-4h4.88c5.1 0 8.78-.25 11.05-.76a13.55 13.55 0 006.05-3 15.04 15.04 0 003.94-5.53c.9-2.15 1.36-4.62 1.36-7.4 0-2.79-.53-5.36-1.6-7.7a14.85 14.85 0 00-11.22-8.89c-2.59-.54-6.4-.82-11.46-.82h-3v34.1m-58.49-35.92a3.32 3.32 0 013.3-3.35c.93 0 1.72.33 2.34 1 .67.62 1 1.4 1 2.35 0 .9-.33 1.68-1 2.35-.62.63-1.4.94-2.35.94a3.2 3.2 0 01-2.35-1 3.25 3.25 0 01-.94-2.3m1.3 8.7h4.05v31.23h-4.06V67.33M173.66 98.55l6-42.21h.65l17.16 34.62 17.05-34.62h.65l6.06 42.2h-4.18l-4.11-30.21L198 98.55h-1.05l-15.11-30.46-4.12 30.46h-4.06m86.17-31.22v31.22h-3.94V93.2c-3.56 4.27-7.64 6.4-12.23 6.4-4.58 0-8.46-1.62-11.64-4.87a16.4 16.4 0 01-4.7-11.7c0-4.55 1.59-8.43 4.76-11.64a15.38 15.38 0 0111.4-4.88c5.1 0 9.24 2.17 12.41 6.52v-5.7h3.94m-3.7 15.76c0-3.57-1.2-6.57-3.59-9a11.8 11.8 0 00-8.82-3.7c-3.45 0-6.37 1.27-8.76 3.82a12.51 12.51 0 00-3.58 8.93 12.6 12.6 0 003.64 9 11.7 11.7 0 008.7 3.76c3.41 0 6.33-1.21 8.76-3.64a12.44 12.44 0 003.65-9.17m10.5-15.76h4.12v4.53c1.1-1.85 2.16-3.2 3.17-4.06a5.37 5.37 0 013.47-1.3c1.3 0 2.59.36 3.88 1.06l-2.11 3.41a3.5 3.5 0 00-1.83-.52c-1.21 0-2.37.62-3.46 1.88a12.07 12.07 0 00-2.36 4.88c-.5 1.96-.76 5.54-.76 10.76v10.58h-4.12V67.33m117.65-10.99h8.35c4.43 0 7.78.9 10.05 2.7 2.32 1.76 3.47 4.31 3.47 7.64a9.76 9.76 0 01-5.4 8.82c2.9.94 5.09 2.35 6.58 4.23a10.3 10.3 0 012.3 6.7c0 3.5-1.28 6.4-3.83 8.7-2.55 2.28-5.84 3.42-9.88 3.42h-11.64V56.34m4.18 4.11v13.52h2.4c3.7 0 6.43-.59 8.24-1.76 1.8-1.18 2.7-3.02 2.7-5.53 0-4.15-2.82-6.23-8.46-6.23h-4.88m0 17.76v16.22h5.23c3.02 0 5.23-.3 6.64-.88a8.33 8.33 0 003.53-2.82c.9-1.3 1.35-2.6 1.35-3.94 0-1.33-.25-2.5-.76-3.53a7.85 7.85 0 00-2.3-2.7 9.91 9.91 0 00-3.58-1.77c-1.37-.39-3.96-.58-7.76-.58h-2.35" font-size="58.79" font-weight="400" fill="#a57242" font-family="STHeiti"/><path d="M180.87 5c-2.78.1-1.9.9-7.9 2.37-6.07 1.5-13.47 1.03-20 3.77-19.5 8.18-23.4 36.12-41.13 46.13-13.24 7.48-26.6 8.08-38.62 11.84-7.9 2.48-16.54 7.56-23.69 13.72-5.55 4.79-5.7 9-11.5 15-6.2 6.42-24.67.1-33.03 9.94 2.7 2.72 3.87 3.49 9.19 2.78-1.1 2.08-7.59 3.84-6.32 6.9 1.34 3.23 17 5.42 31.25-3.18 6.64-4 11.92-9.78 22.25-11.16 13.37-1.78 28.78 1.14 44.25 3.38-2.3 6.84-6.9 11.39-10.59 16.84-1.14 1.23 2.3 1.37 6.22.63 7.06-1.75 12.14-3.15 17.47-6.25 6.54-3.81 7.53-13.58 15.56-15.7 4.47 6.88 16.64 8.5 24.19 3-6.63-1.87-8.46-15.97-6.22-22.18 2.12-5.88 4.2-15.29 6.34-23.06 2.3-8.35 3.14-18.87 5.9-23.13 4.18-6.4 8.79-8.6 12.79-12.2 4-3.6 7.66-7.12 7.54-15.38-.04-2.66-1.42-4.14-3.95-4.06z" fill="#002b64" fill-rule="evenodd"/><path d="M10.75 116.87c10.15 1.45 16.32 0 24.46-3.54 6.93-3 13.63-9.2 21.81-11.83 12.02-3.85 25.2 0 38.05.78 3.13.19 6.24.19 9.31-.15 4.79-2.94 4.69-13.94 9.35-14.95-.14 15.44-6.47 24.7-13.09 33.65 13.95-2.47 22.3-10.54 27.94-21.31a78.73 78.73 0 004.47-10.47c2 1.53.86 6.2 1.86 8.72 9.61-5.35 15.12-17.57 18.76-29.92 4.22-14.3 5.94-28.78 8.66-33.02 2.66-4.13 6.79-6.67 10.56-9.32 4.28-3 8.1-6.13 8.76-11.86-4.52-.42-5.56-1.47-6.23-3.74-2.26 1.27-4.34 1.55-6.7 1.62-2.03.06-4.27-.03-7 .25-22.63 2.32-25.5 27.26-40.01 41.4a34.02 34.02 0 01-3.4 2.89c-5.08 3.78-11.31 6.49-17.04 8.68-9.28 3.54-18.1 3.8-26.8 6.85a80.24 80.24 0 00-18.12 9.1c-1.32.9-2.55 1.81-3.69 2.74-3.08 2.52-5.1 5.31-7.05 8.19-2.02 2.96-3.97 6.01-6.94 8.92-4.8 4.72-22.77 1.38-29.1 5.76a5.16 5.16 0 00-1.64 1.77c3.45 1.57 5.76.6 9.73 1.05.52 3.76-8.2 6-6.9 7.74z" fill="#c49a6c"/><path d="M147.84 89.73c.27 4.32 2.78 12.9 4.99 14.98-4.34 1.05-11.81-.69-13.73-3.75.99-4.42 6.11-8.46 8.74-11.23z" clip-rule="evenodd" fill="#c49a6c" fill-rule="evenodd"/><path d="M154.2 21.14c3.2 2.78 9.92.54 8.71-4.99-4.97-.41-7.86 1.28-8.72 4.99z" clip-rule="evenodd" fill="#002b64" fill-rule="evenodd"/><path d="M176.52 14.67c-.85 1.79-2.48 4.09-2.48 8.64 0 .78-.6 1.32-.6.11.04-4.44 1.22-6.37 2.47-8.9.58-1.03.93-.6.61.15z" fill="#002b64"/><path d="M175.66 14c-1 1.7-3.42 4.81-3.82 9.34-.07.78-.7 1.26-.61.06.44-4.42 2.37-7.2 3.84-9.6.66-.98.98-.52.6.2zm-.78-.9c-1.14 1.62-4.87 5.35-5.65 9.84-.14.76-.8 1.2-.61 0 .8-4.37 4.02-7.8 5.68-10.08.75-.92 1.02-.44.58.24zm-.7-1c-1.36 1.45-5.8 6.2-7.2 10.54-.24.74-.97 1.07-.6-.08 1.4-4.22 5.3-8.76 7.26-10.78.87-.8 1.08-.29.54.33z" fill="#002b64"/></svg>
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
