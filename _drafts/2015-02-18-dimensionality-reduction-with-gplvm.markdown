---
layout: post
title:  "Dimensionality reduction with GPLVM"
date:   2015-02-18 14:20
categories: blog slac
tags: dobots
image: /assets/article_images/wsn_sim.png
math: true
published: false
---

In my [previous]({% post_url tech/2015-02-12-simple-wsn-simulation %}) post regarding Wireless Sensor Network (WSN) simulations I created a simulation of a user walking around in a space filled with sensor nodes. The goal is to predict the travelled path (the trace) of the user. At each time step the user records the _Received Signal Strength Indicator_ ([RSSI](http://en.wikipedia.org/wiki/Received_signal_strength_indication)) of each node. This RSSI value is a measurement of the transmit power of a received signal.

As RSSI describes transmit power of a _received_ signal distance between nodes (and other factors such as obstacles) influence the RSSI. Roughly, very roughly[^1]<sup>,</sup>[^2] there is a relation between RSSI and distance:

\begin{equation}
RSSI = -10 n \log _ {10}(d) + A
\end{equation}

with $d$ the distance between the receiver and the transmitter, $n$ the pathloss exponent and $A$ the RSSI value at 1m of the transmitter. The pathloss exponent is in free space usually set to 2.

As the relation between RSSI and distance is very unreliable and highly affected by the environment we won't use this for localization. We do however use it to model the RSSI that is captured by the user.

{% highlight python %}
def RSSIraw(dist, n, txPower):
    """Get the RSSI strength at a given distance"""
    return -(10 * n) *  math.log10(dist) + txPower

def RSSI(dist, n, txPower, sd = 1):
    """RSSI with gaussian noise N(0,sd)"""
    return RSSIraw(dist, n, txPower) + np.random.normal(0, n)
{% endhighlight %}

By adding Guassian noise we get signals that are more closely to real-world measurements.

RSSI-based localisation has been done before succesfully. A good example is WiFi-SLAM[^3] which uses GP-LVM in combination with a motion model and back constraints. Here we focus primarily on the GP-LVM and look at the influence of noise.

## Dimensionality reduction

Let's formalize our problem. Given a space with $n$ wireless sensor nodes. Each sensor node $i$ has a position vector $\mathbf{s} _ {i} \in \Re^{d}$ with $d = 2$ for 2D environments. All positions of these nodes can be combined in a position matrix $\mathbf{X} \in \Re^{n \times d}$. The location of a user traversing through the space at time $t$ can be described with $\mathbf{u} _ {t} \in \Re^{d}$. The aggregated matrix of the user's movement pattern is $\mathbf{U} \in \Re^{m \times d}$ with $m$ denoting the amount of observations. Both $\mathbf{X}$ and $\mathbf{U}$ are latent (i.e. unobserved) variables and are independent of each other (i.e. the position of a user does not influence the position of a node and vice versa).

At each timestep the user records all signal strengths of the nodes in the environment[^4], this results in an observed data matrix $\mathbf{Y} \in \Re^{m \times n}$. The relationship between the signal strength and the positions can be described using a parameterised function:

\begin{equation}
y _ {ti} = f(\mathbf{x} _ {i}, w _ {j}) + \epsilon
\end{equation}

Noise is modelled by $\epsilon$ and the parameters are made explicit through $w$. This function implies a probabilistic relation between the signal strength, the location of a node and the current location of the user:

\begin{equation}
p(y _ {ij} | \mathbf{x}_{i}, w _ {j})
\end{equation}




## References & Notes

[^1]: Many researchers question whether RSSI values contains any value at all. For example:<br> Dong, Q., & Dargie, W. (2012). _Evaluation of the reliability of RSSI for indoor localization_. In _2012 International Conference on Wireless Communications in Underground and Confined Areas, ICWCUCA 2012_. doi:10.1109/ICWCUCA.2012.6402492
[^2]: Oguejiofor, O., Okorogu, V., Abe, A., & BO, O. (2013). _Outdoor Localization System Using RSSI Measurement of Wireless Sensor Network. International Journal of Innovative Technology and Exploring Engineering (IJITEE)_, 2(2), 1–6.
[^3]: Ferris, B., Fox, D., & Lawrence, N. (2007). _WiFi-SLAM Using Gaussian Process Latent Variable Models_. In IJCAI (pp. 2480–2485).
[^4]: Here I assume, for now, that all nodes are in range of the user. This is, of course, in real world scenario's not the case.
