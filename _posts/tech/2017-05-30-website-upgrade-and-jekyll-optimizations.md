---
layout: post
title:  "Website upgrade & Jekyll blog optimizations"
date:   2017-05-30 16:43
categories: blog tech
tags: [website, webdev, optimizations, speed]
published: false
description: "It has been over two years since the last full update of my website itself and it was time for an upgrade!"
---

It has been over two years since the last full update of my website itself and it was time for an upgrade! I started from scratch and rebuild the whole underlying Jekyll structure and all of the css. The main goal was to create new fresh design while keeping the site light and clean. With a [GTmetrix](https://gtmetrix.com) score of *A(98%)/A(97%)* on [GTmetrix](https://gtmetrix.com) and *99/99* on using PageSpeed Insights the latter has been achieved; the design is of course a matter of taste 😉.

| Page                       | Home  | About page | Blog Tech index |
|----------------------------|-------|------------|-----------------|
| PageSpeed (Mobile/Desktop) | 99/99 | 99/99      | 99/95           |
| YSlow                      | 97%   | 98%        | 98%             |
| KB                         | 178KB | 158KB      | 35.3KB          |
| Loading time               | 852ms | 869ms      | 919ms           |
| # requests                 | 8     | 5          | 4               |

This post gives a small overview of the changes and all of the techniques that are used to build this site.

## No more jQuery

The old website used jQuery on every page for some basic functionality. Now only the interactive posts load jQuery as some of the scripts and libraries depend on it. All other/regular pages only use [vanillajs](http://vanilla-js.com/). Removing jQuery has greatly improved the overall page load/rendering time. 

## New design, better CSS loading

I discarded all the old css and started from scratch using the [Bootstrap 4](http://getbootstrap.com/) reboot and grid builder mixins. All styles are written in Sass and compiled using [node-ass](https://github.com/sass/node-sass) and [PostCSS](http://postcss.org/). One single command generates all the necessary css:

```
node-sass main.scss --output-style compressed --output ../assets/styles/min && postcss --no-map.inline --use autoprefixer postcss-flexbugs-fixes -o ../assets/styles/min/main.css ../assets/styles/min/main.css && node inline-css.js
```

[loadCSS](https://github.com/filamentgroup/loadCSS) is used to asynchronously load the css and [critical](https://github.com/addyosmani/critical) for generating the above-the-fold inline css.

## Privacy-aware analytics

While I used Google Analytics to register traffic on my website, I do not mind people blocking this. To still get some sense of traffic a small script registers whenever someone visits a page. This script discards the IP address of the visitor and only logs the page and (if possible) the country of origin.

## Building & Hosting

The site is (still) hosted using GitHub Pages and [Jekyll](https://jekyllrb.com/) (now using version 3). [CloudFlare](https://www.cloudflare.com/) is used to optimize the delivery (and cache as much as possible in one of their edge nodes).
