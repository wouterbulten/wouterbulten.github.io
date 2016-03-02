---
layout: post
title:  "Blog Optimization 2: Minifying HTML"
date:   2016-03-02 19:30
categories: blog tech
tags: [jekyll, webdev, speed]
published: true
description: "In part 2 of my blog optimization series I focus on minifying and especially on the HTML."
---

This second post in my "Blog Optimization" series is more of a quick-win/tip than a very large post. Last time we decreased the footprint of every page by removing large icon fonts.

{% include posts/bo-list.html %}

- 'About page'21
18.3k -> 17.1kb

20kb -> 18.4kb

kalman 29.2kb -> 31.7kb

| Page                                                       | Before | After  | Saved |
|------------------------------------------------------------|--------|--------|-------|
| About                                                      | 18.3kb | 17.1kb |       |
| Curriculum Vitae                                           | 20.0kb | 18.4kb |       |
| Kalman filters explained: Removing noise from RSSI signals | 29.2kb | 31.7kb |       |
