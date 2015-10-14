---
layout: post
title:  "Diving in into the Model with GPy"
date:   2015-02-20 09:15
categories: blog tech
tags: dobots
image: /assets/article_images/gplvm_optimize.png
---

Lately we looked at [GPy]({% post_url tech/2015-02-13-first-steps-with-gpy %}) using some simple examples. Now we'll dive deeper and look more closely to the inner workings of models. We'll start with the basics and continue further by decomposing the _Guassian Process Latent Variable_ model (GPLVM).

> Note: This post is fairly specific to GPy and the chosen model.

## Investigating parameters

All GPy models extend the _Parameterized_ class. This base class gives us several useful functions for interacting with the model parameters. For any given model one can, for example, retrieve a list of parameters:

{% highlight python %}
import GPy

# Import some model (here an example regression model)
m = GPy.examples.regression.sparse_GP_regression_1D()

# Print the whole model
print m

# Print parameters of a specific sub part
# In this case the parameters of the RBF kernel
print m.rbf

# One can also use regex for retrieving parameters
# Here, retrieve every parameter that contains 'a'
print m['.*a']
{% endhighlight %}

Note that we use Python 2.* syntax here as GPy does not work with Python 3+. The output will be something like:

	print m
	Name                 : sparse gp mpi
	Log-likelihood       : 580.514760527
	Number of Parameters : 8
	Parameters:
	  sparse_gp_mpi.           |       Value        |  Constraint  |  Prior  |  Tied to
	  inducing inputs          |            (5, 1)  |              |         |         
	  rbf.variance             |     1.62224942121  |     +ve      |         |         
	  rbf.lengthscale          |     2.54706550891  |     +ve      |         |         
	  Gaussian_noise.variance  |  0.00281937459061  |     +ve      |         |      

	print m.rbf
	  rbf.         |      Value      |  Constraint  |  Prior  |  Tied to
	  variance     |  1.62224942121  |     +ve      |         |         
	  lengthscale  |  2.54706550891  |     +ve      |         |        

	print m['.*a']
	  Index  |       sparse_gp_mpi.rbf.variance        |  Constraint  |    Prior     |  Tied to
	   [0]   |                              1.6222494  |     +ve      |              |    N/A    
	  -----  |      sparse_gp_mpi.rbf.lengthscale      |  ----------  |  ----------  |  -------
	   [0]   |                              2.5470655  |     +ve      |              |    N/A    
	  -----  |  sparse_gp_mpi.Gaussian_noise.variance  |  ----------  |  ----------  |  -------
	   [0]   |                           0.0028193746  |     +ve      |              |    N/A    

Likewise to printing, we can alter parameters roughly the same way:

{%highlight python %}
m.rbf.variance = 1.2

print m.rbf
{% endhighlight %}

	rbf.         |      Value      |  Constraint  |  Prior  |  Tied to
	variance     |            1.2  |     +ve      |         |         
	lengthscale  |  2.54706550891  |     +ve      |         |         

Editing a parameter can be useful when you want to initialise parameters using prior knowledge or set them to a fixed value (for which you need to add a constraint to that specific parameter).

## Decomposing GPLVM

As I am planning to use the GPy _GPLVM_ model in my [WSN setup]({% post_url tech/2015-02-12-simple-wsn-simulation %}) I was curious about the inner workings of the model. Of course we have the original paper describing the model[^1] but investigating a concrete implementation can give more insights in how everything works. Generally: How does the GPLVM model infer the latent variables from a set of observed variables? I'll focus here a bit more on the general steps than on the specific math (which could be a topic for a follow-up post).

GPLVM is a dimensionality reduction technique which maps a (highly dimensional) observed space to a smaller dimensional latent space. To initialize our model we only define the dimensions of the latent space, the initialisation method and our observed data Y:

{% highlight python %}
Y = some high dimensional dataset
gplvm = GPLVM(Y, 2, init='PCA')
{% endhighlight %}

### Initialisation

1. GPLVM starts from an initialisation of X (the latent space). This initialisation can be set using a external method (for example Isomap when doing localisation). Otherwise principle component analysis (PCA) is used.

	> One could wonder, why use a dimensionality reduction algorithm as the starting point of a dimensionality reduction problem? Can one not use PCA alone? Well, PCA is a linear reduction algorithm. By using specific kernels the GPLVM can be used as a non-linear model which results in, for some types of data, a better fit. This is particular prominent when the data contains noise. The GPLVM model usually results in a far better fit than PCA on the noisy data.

2. After initialisation a kernel is constructed. This can be a custom kernel (set by the user) or a default kernel. The default kernel is a Guassian / Least Squares / RBF kernel with a lengthscale set to the variance of the principle components of the PCA initialisation. A bias kernel is added to the Guassian kernel. The parameters of these kernels can be optimised.

3. GPLVM extends a GP model with the defined kernel and a Guassian Inference method.

4. After all values are set the GP model performs inference, calculates the log marginal likelihood and gradients.

	> More specifically, on any changes to the model parameters (e.g. during optimisation) the `parameters_changed()` function is called which, in the case of GP, reperforms inference.

### Optimisation

After initialisation of the model the parameters must be trained. For a simple GP [regression problem]({% post_url tech/2015-02-13-first-steps-with-gpy %}) this means optimising the kernel parameters. For GPLVM we also optimise the latent space X as this what we want to learn.

With GP regression we are interested in predicting new and unseen points. Here the full training data (X and Y) are known and the primary focus is optimising the parameters of the kernel. With GPLVM we are interested the mapping from the observed space to the latent space. Therefore we optimise both the parameters and the latent space.

Optimisation is performed using an optimiser which defaults to a implementation of [conjugate gradient descent](http://en.wikipedia.org/wiki/Conjugate_gradient_method). Optimisers use the log likelihood and gradients as input. The priors on the parameters are used to constrain the values. After each iteration of the optimiser the parameters are changed and the the `parameters_changed()` function is called.

## Final remarks

This post was a short investigation of the inner workings of a model in the GPy framework. These models are of course, in terms of implementation, a lot more elaborate than described here. A closer look to the source code can help with any questions.

## References & Notes

[^1]: Lawrence, N. D. (2005). _Probabilistic Non-linear Principal Component Analysis with Gaussian Process Latent Variable Models. The Journal of Machine Learning Research_, 6, 1783–1816.

	Lawrence, N. D. (2004). _Gaussian Process Latent Variable Models for Visualisation of High Dimensional Data. In Advances in Neural Information Processing Systems 16_ (pp. 329–336).

*[GP]: Gaussian Process
*[GPLVM]: Gaussian Process Latent Variable Model
*[PCA]: Principle Component Analysis
*[RBF]: Radial Basis Function
