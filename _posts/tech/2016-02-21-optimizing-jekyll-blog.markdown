---
layout: post
title:  "Optimizing a Jekyll blog"
date:   2016-02-21 20:49
categories: blog tech
tags: [jekyll, webdev, speed]
published: false
description: "My blog is hosted using Jekyll which is a static site generator. Static sites are inherently fast, but I took some extra measures to achieve an even faster website."
---

This blog is hosted using Jekyll and builds upon the [Mediator](https://github.com/dirkfabisch/mediator) theme.

### Using CloudFlare

The first and most simple step was switching to [CloudFlare](https://www.cloudflare.com/). Most importantly this gave me the option to rewrite expiration headers. As I use Github Pages as my primary host I am dependent on their settings. CloudFlare gives me the ability to alter these. This is also one of the important metrics for Google Page Speed.

### Bye Font Awesome, hello SVG!

My theme used Font Awesome icons for things such as the RSS link, backward and forward buttons and other small ui elements. This
