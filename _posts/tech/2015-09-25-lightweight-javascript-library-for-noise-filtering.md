---
layout: post
title:  "Lightweight Javascript library for Noise filtering using Kalman filters"
date:   2015-09-25 16:08
categories: blog tech
tags: javascript kalman noise
chartjs: true
math: false
post_scripts: kalmanjs-examples
published: true
---

Filtering noisy measurements can be an extremely difficult endeavor; take brain signals for example. While this is true, there are also many situations where the system is fairly simple and the focus lies on speed, online computation (i.e. in real time) and ease of use. Filtering distance measurements from a sonar sensor can be such a case. For these applications it is useful to have a simple, but effective, noise filtering algorithm in your toolkit. Let me introduce [KalmanJS](https://www.github.com/wouterbulten/kalmanjs): a small library implementing the idea of Kalman filters, without any dependencies, to filter out noise in 1D systems.

I've used Kalman filters extensively in the past and they are a fast and easy solution for many noise filtering applications. Recently, I was in need of a small javascript library (i.e. no dependencies) that would work fast on 1D data (i.e. the dimensionality of the input data is 1). I've created this as part of my indoor localization project and just recently transformed the Kalman filter part into a separate library. In this blog post I quickly show how you can use the library to filter out noise. Even if you create your own implementation, it should be able to give you the gist of how everything works. In the next few days a second blog post will focus more on the *how* of these filters. For now, we just look at the results *and some fancy figures*!

**Tl;dr: Why should I use Kalman filters?**

1. Low memory: the filter does not require the whole data set to function. Only a few integers.
2. Fast (low time complexity)
3. Easy to implement
4. Good results (and that's what we are here for 😉)

# First example: Constant data

We start with a simple exampling in the form of a constant system: our true state (e.g. distance measurements) is constant but measurements of this state are affected by high levels of noise. If you look at the graph below, would you be able to find a good estimate of the true state?

*Note: Data is automatically generated, every time you refresh the page you will see a different dataset.*

-----
<div id="chart-constant-data-legend"></div>
<canvas id="chart-constant-data" width="640" height="400"></canvas>
> **Figure 1:** Our first data is a constant system. Unfortunately, as in real life, we only measure the noisy data. Noise is produced by adding Gaussian noise.

-----

The data is generated by two simple map operations:

{% highlight javascript %}

var dataConstant = Array.apply(null, {length: dataSetSize}).map(function() {
  return 4;
});
//Add noise to data
var noisyDataConstant = dataConstant.map(function(v) {
  return v + randn(0, 3);
});
{% endhighlight %}

> `randn(mean, sd)` is a simple function that returns random numbers following a Gaussian distribution

So how do we filter this data? The *KalmanJS* library consists of a single class and each instantiation of that class represents a single system. To use the Kalman filter we apply the filter on each value of our dataset:

{% highlight javascript %}
//Apply kalman filter
var kalmanFilter = new KalmanFilter({R: 0.01, Q: 3});

var dataConstantKalman = noisyDataConstant.map(function(v) {
  return kalmanFilter.filter(v);
});
{% endhighlight %}

Note that we apply the filter on each individual data point. The filter does not keep a record of all previous values; it only stores the current estimate and a measure of its certainty.

The only thing we have to worry about in our constant system is the estimate of the noise levels which are represented by `R` and `Q`.

> There are more variables we can set in the filter but these are not important for our current example.

`R` models the process noise and describes how noisy our system internally is. Or, in other words, how much noise can we expect from the system itself? As our system is constant we can set this to a (very) low value. `Q` resembles the measurement noise; how much noise is caused by our measurements? As we expect that our measurements will contain most of the noise, it makes sense to set this parameter to a high number (especially in comparison to the process noise).

In real life scenario's you usually make an estimate of `R` and `Q` based on measurements or domain knowledge. For this example we assume we know the noise levels.

Now let's apply the Kalman filter on the data set and see how it performs:

-----
<div id="chart-constant-kalman-data-legend"></div>
<canvas id="chart-constant-kalman-data" width="640" height="400"></canvas>
> **Figure 2:** Kalman filter applied on the constant data set. The true state of the system is also displayed. The Kalman filter, after some initialization, fits the data nicely.

-----

# Second example: Exponential data

Constant data is nice, but sometimes (better: often) we have a system that moves. For this second example I generated values from a simple exponential function. Depending on the noise (try reloading the page a few times) the function is only barely noticeable in the data.

-----
<div id="chart-linear-data-legend"></div>
<canvas id="chart-linear-data" width="640" height="400"></canvas>
> **Figure 3:** Second example showing an exponential increasing function. Only the noisy measurements are shown.

-----

Data is again generated using simple map operations:

{% highlight javascript %}
var dataExponential = Array.apply(null, {length: dataSetSize}).map(function(e, i) {
  return Math.pow(1.1, i);
});

var noisyDataExponential = dataExponential.map(function(v) {
  return v + randn(0, 20);
});
{% endhighlight %}

Now we apply the Kalman filter the same way as in the previous example.

> The Kalman filter can also incorporate movement information in its estimation steps. If you know, beforehand, that a system is non-constant you can use this to improve your results. For now, we just apply a constant filter and see how it performs.

{% highlight javascript %}
var kalmanFilter = new KalmanFilter({R: 0.01, Q: 20});

var dataExponentialKalman = dataExponential.map(function(v) {
  return kalmanFilter.filter(v);
});
{% endhighlight %}


-----
<div id="chart-linear-kalman-data-legend"></div>
<canvas id="chart-linear-kalman-data" width="640" height="400"></canvas>
> **Figure 4:** Result of the Kalman filter on the exponential data. Depending on the noise the results will range from "not very good" to "awful" (again, try reloading the page to see more examples). The constant filter is not able to capture the growth of the function.

-----

Hmm, our constant Kalman filter is not really able to keep up with the exponential growth. This simple approach often works for systems that have a small growth function. The Kalman filter can easily adapt to changes if they are not to large in relation to the data points. Unfortunately, our exponential growth is to large.

Can we still rescue our exponential data?

# Third example: Predicting growth

Luckily for us, the Kalman filter offers several ways to incorporate more domain knowledge. We can model how a previous state effects a new state (through the parameter `A` of the library) but can also incorporate motion commands. This last option is useful if you know that a function only changes given some external or internal input (e.g. a movement command to a robot).

A simple example would be a function that only grows given some external input:

{% highlight javascript %}
//Here B is the control parameter and is multiplied by the control/action on each filter step
var kalmanFilter = new KalmanFilter({R: 0.01, Q: 20, B: 2});

//Additionally to the measurement we also give an additional control value to the filter
kalmanFilter.filter(v, 1); //Motion is applied
kalmanFilter.filter(v, 0); //Motion is not applied
{% endhighlight %}

How you can use these control vectors is a bit out of the scope of this post; just remember: if you have a system where there is movement caused by events there are ways to incorporate it into the filter.

For now we focus on `A` which is the transition variable that describes how a state transforms from a previous state to the current. In our exponential growth example we know that each new state is the result of a multiplication of the growth factor (1.1) times the previous state. We can tell this to the Kalman filter and the filter will use this additional information in the filter step:

{% highlight javascript %}
var kalmanFilter = new KalmanFilter({R: 0.01, Q: 20, A: 1.1});

var dataExponentialKalman = dataExponential.map(function(v) {
  return kalmanFilter.filter(v);
});
{% endhighlight %}

This adjustment results in a far better fit. Using our prior estimate of the growth we are able to nicely fit the data and filter out a large portion of the noise:

-----
<div id="chart-growth-kalman-data-legend"></div>
<canvas id="chart-growth-kalman-data" width="640" height="400"></canvas>
> **Figure 5:** Result of the new Kalman filter (with growth model) on the exponential data. The filter performs far better than the previous filter which did not have any model for the growth of the data.

-----

# Wrapping up

By now you should have a rough idea of how you can apply Kalman filters to filter out noise. If you want to see the internal workings of the filter I used in this post you can check out the [GitHub repository](https://github.com/wouterbulten/kalmanjs). For everyone who has 1D data and is in need of a low complexity implementation, I suggest that you give these type of filters a try. They are fast and easy to use 😀.

Higher dimensional data? Rest assured, there are also multi-dimensional implementations available on the web!