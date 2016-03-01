---
layout: post
title:  "Blog Optimization 1: Replacing Font Awesome with SVG"
date:   2016-03-01 20:49
categories: blog tech
tags: [jekyll, webdev, speed, svg]
published: false
description: "My blog is hosted using Jekyll which is a static site generator. Static sites are inherently fast, but I took some extra measures to achieve an even faster website. This is part 1 of the series: replacing Font Awesome."
---

This post is the first in a series of (micro) optimizations I did to my Jekyll blog. Each post will focus on a single optimization and shows how you can apply this to your own (Jekyll) blog. Some of these posts will be focussed primarily on blogs using Jekyll and Github Pages, others will be less specific and focus on performance on the web in general.

Today we kick-off with SVG icons!

{% include posts/bo-list.html %}

## The problem

[Font Awesome](https://fortawesome.github.io/Font-Awesome/) is a great free icon font which doesn't require an introduction. The list of included icons is large and the ease of use makes it a great choice for web applications.

However, on a blog like this most users will only visit a few pages at most. Most traffic comes from search engines and visitors are probably looking for an answer to a specific question. So, to cater for these users we need to optimize the performance as if every users stats with an empty cache. This is in contrast to more high-feature web applications that engage users for a longer amount of time.

To improve performance the first strategy is to improve loading of the website. This includes the amount of requests, the total size of the page and the rendering.

After a small search I found out that my theme used Font Awesome for the staggering amount of *four* icons. In other words, to display 5 icons a user needs to load the Font Awesome css and the font itself. We can do better right?

## Icon definition list

A few of the simple icons (such as a downward facing arrow) I replaced with HTML entities (such as &#8595;). The more complex icons (Github/LinkedIn icons as an example) were a bit harder to replace. My solution was to create a small SVG icon library in the Jekyll theme.

Using a tool such as [IcoMoon](https://icomoon.io/app/) you can easily generate SVG symbols for common-used icons. The Github and LinkedIn icons for example give the following definition:

{% highlight xml %}
<symbol id="icon-linkedin" viewBox="0 0 1024 1024">
  <title>linkedin</title>
  <path class="path1" d="M384 384h177.106v90.782h2.532c24.64-44.194 84.958-90.782 174.842-90.782 186.946 0 221.52 116.376 221.52 267.734v308.266h-184.61v-273.278c0-65.184-1.334-149.026-96.028-149.026-96.148 0-110.82 70.986-110.82 144.292v278.012h-184.542v-576z"></path>
  <path class="path2" d="M64 384h192v576h-192v-576z"></path>
  <path class="path3" d="M256 224c0 53.019-42.981 96-96 96s-96-42.981-96-96c0-53.019 42.981-96 96-96s96 42.981 96 96z"></path>
</symbol>
<symbol id="icon-github" viewBox="0 0 1024 1024">
  <title>github</title>
  <path class="path1" d="M512.008 12.642c-282.738 0-512.008 229.218-512.008 511.998 0 226.214 146.704 418.132 350.136 485.836 25.586 4.738 34.992-11.11 34.992-24.632 0-12.204-0.48-52.542-0.696-95.324-142.448 30.976-172.504-60.41-172.504-60.41-23.282-59.176-56.848-74.916-56.848-74.916-46.452-31.778 3.51-31.124 3.51-31.124 51.4 3.61 78.476 52.766 78.476 52.766 45.672 78.27 119.776 55.64 149.004 42.558 4.588-33.086 17.852-55.68 32.506-68.464-113.73-12.942-233.276-56.85-233.276-253.032 0-55.898 20.004-101.574 52.76-137.428-5.316-12.9-22.854-64.972 4.952-135.5 0 0 43.006-13.752 140.84 52.49 40.836-11.348 84.636-17.036 128.154-17.234 43.502 0.198 87.336 5.886 128.256 17.234 97.734-66.244 140.656-52.49 140.656-52.49 27.872 70.528 10.35 122.6 5.036 135.5 32.82 35.856 52.694 81.532 52.694 137.428 0 196.654-119.778 239.95-233.79 252.624 18.364 15.89 34.724 47.046 34.724 94.812 0 68.508-0.596 123.644-0.596 140.508 0 13.628 9.222 29.594 35.172 24.566 203.322-67.776 349.842-259.626 349.842-485.768 0-282.78-229.234-511.998-511.992-511.998z"></path>
</symbol>
{% endhighlight %}

Note that each symbol has a unique id, we will use this later to include the icon on any page. We can place these icons at the top of every page, just below the body tag:

{% highlight html %}
<body>
<svg style="display: none">
  <defs>
  <!-- all your icon definitions -->
  </defs>
</svg>

<!-- remainder of page -->
{% endhighlight %}

Last we need some CSS to make sure the icons display correctly. Don't change the width and height values, by setting them both to `1em` we can later scale the icons properly using `font-size`.

{% highlight css %}
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor
}
{% endhighlight %}

## Using the icons

The only drawback of this method is that including an icon is a bit more work than the Font Awesome approach. But, when you'll get used to it you won't see the difference. Instead of the convenient `fa fa-icon` classes we use an inline svg element:

{% highlight html %}
<svg class="svg-icon">
  <use xlink:href="#icon-github"></use>
</svg>

<!-- Examples showing larger font sizes: -->
<span style="font-size: 1em;"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>
<span style="font-size: 2em;"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>
<span style="font-size: 3em;"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>

<!-- Example with color: -->
<span style="color: darkred"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>
{% endhighlight%}

If you added everything the snippet above will show the following:

<span style="font-size: 1em;"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>
<span style="font-size: 2em;"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>
<span style="font-size: 3em;"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>
<span style="color: darkred"><svg class="svg-icon"><use xlink:href="#icon-github"></use></svg></span>

Additionally, you can apply many of the same CSS effects to these SVG icons as you would with normal text. Only text-specific things such as `text-decoration` or `font-style` won't work.

## Conclusion

I really loved working with FontAwesome in previous projects. But, for this blog, replacing the icons with their SVG counterpart made a large difference in performance. For (small) blogs such a change can be done very quickly as the set of used icons is often limited. For larger applications this could result in a larger rewrite of your codebase. But, given all the benefits I wouldn't be surprised if more websites would do the same. To quote [Github](https://github.com/blog/2112-delivering-octicons-with-svg) :

>  By switching from icon fonts, we can serve our icons more easily, more quickly, and more accessibly. And they look better. Enjoy.
