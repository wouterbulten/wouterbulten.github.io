---
layout: post
title:  "Website upgrade & Jekyll blog optimizations"
date:   2017-05-30 16:43
categories: blog tech
tags: [website, webdev, optimizations, speed]
published: true
description: "It has been over two years since the last full update of my website itself and it was time for an upgrade!"
---

It has been over two years since the last full update of my website itself and it was time for an upgrade! I started from scratch and rebuild the whole underlying Jekyll structure and all of the CSS. The main goal was to create a new fresh design while keeping the site light and clean. With a score of *A(98%)/A(97%)* on [GTmetrix](https://gtmetrix.com) and *99/99* using PageSpeed Insights the latter has been achieved; the design is of course a matter of personal taste. An overview of some of the key statistics:

| Page                       | Home  | About page | Blog Tech index |
|----------------------------|-------|------------|-----------------|
| PageSpeed (Mobile, Desktop) | 99, 99 | 99, 99      | 99, 95           |
| YSlow                      | 97%   | 98%        | 98%             |
| KB                         | 178KB | 158KB      | 35.3KB          |
| Loading time               | 852ms | 869ms      | 919ms           |
| # requests                 | 8     | 5          | 4               |

Although some things can still be improved, I am very happy with these results. These high speed scores show that you can really achieve good performing sites using lightweight systems such as Jekyll. In the remainder of this post I give a small overview of some of the changes and the techniques that are used to build this site.

## No more jQuery / less JS

The old website used jQuery on every page for some basic functionality. Now only the interactive posts load jQuery as some of the scripts and libraries depend on it. These scripts are of course loaded asynchronously. All other/regular pages only use [vanillajs](http://vanilla-js.com/) for some basic functionality. Removing jQuery has greatly improved the overall page load/rendering time. 

## New design, better CSS loading

I discarded all the old CSS and started from scratch using the [Bootstrap 4](http://getbootstrap.com/) reboot and grid builder mixins. All styles are written in Sass and compiled using [node-ass](https://github.com/sass/node-sass) and [PostCSS](http://postcss.org/). 
[loadCSS](https://github.com/filamentgroup/loadCSS) is used to asynchronously load the css and [critical](https://github.com/addyosmani/critical) for generating the above-the-fold inline css.

In three steps all css is generated from my base files:

```shell
# Convert sass to css
node-sass <input> --output-style compressed --output <css output>
# Add necessary vendor prefixes
postcss --no-map.inline --use autoprefixer postcss-flexbugs-fixes -o <input> <css output>
# Compute the inline css (for above the fold)
node inline-css.js
```

The `inline-css.js` file is a small node script that uses [critical](https://github.com/addyosmani/critical) for generating the above-the-fold CSS. The generated css is included in the head by Jekyll automatically. In fact, different versions of the above-the-fold css are generated depending on the page type.

```javascript
var critical = require('critical');

// Example of generating above the fold css
critical.generate({
    base: '../',
    src: '_site/index.html',
    dest: '_includes/critical-css.css',
    minify: true,
    width: 1300,
    height: 900
});
```

## Privacy-aware analytics

While I used Google Analytics to register traffic on my website, I do not mind people blocking this. To still get some sense of traffic a small script registers whenever someone visits a page. This script discards the IP address of the visitor (and other user info) and only logs the page and (if possible) the country of origin.

## Blog software

The blog and all of the pages are powered by [Jekyll](https://jekyllrb.com/) (now using version 3). I use some small tweaks to further optimize the build, such as minimzing all html output at build time. Posts are annotated using [Schema.org](http://schema.org/) to structure the data for search engines.

## Hosting

The site is (still) hosted using [GitHub Pages](https://pages.github.com/) and [CloudFlare](https://www.cloudflare.com/) is used to optimize the delivery (and cache as much as possible in one of their edge nodes).

## Feedback?

So far for the updates! As the site is still new and actively developed, any feedback is welcome. Please add a comment below if you have any tips or found a bug. You can also use the [contact form](/contact/). Thanks :)
