---
layout: post
title:  "Introduction to Gaussian Processes"
date:   2015-02-16 22:48
categories: blog
tags: dobots
math: true
---

## Random variables and distributions

Consider a simple example such as rolling a fair dice $d _ {1}$: there are six distinct outcomes and each outcome has an equal probability (namely $\frac{1}{6}$). We define this set of outcomes as $\Omega$; this is a discrete distribution. Discrete distributions can only have a finite (which is clearly the case in our example) or a countable infinite number of values.

Now we add a second dice, $d _ {2}$, and we want to reason about the sum of the two dices: e.g. what is the probability of an even value? Note that we are now not interested anymore in the individual outcomes but in events. In the model the two outcomes ($n _ {1} = 1, n _ {2} = 3$) and ($n _ {1} = 1, n _ {2} = 1$) are equal: the sum is even in both cases.

To reason about the sum instead of single outcomes we introduce a mapping from the set of outcomes to the variable we wish to model. We define a measurable function, $X$, that describes this relation, which is called a _random_ (or _stochastic_) variable. Formally, a random variable can be defined as a function

\begin{equation}
	X : \Omega \to \mathbb{R}
\end{equation}


in which $\Omega$ is the set of possible outcomes. Note that $\mathbb{R}$ could also be replaced by a different type of set (but is often $\mathbb{R}$). Applying this to our dice example is simple: 

$$
X(n _ {1}, n _ {2}) = 
\begin{cases}
1 & \text{if } (n _ {1} + n _ {2}) \text{ mod } 2 = 0\\
0 & \text{otherwise}
\end{cases}
$$

We map all the different outcomes (different values of $n _ {1}$ and $n _ {2}$) to numerical values. Note that each individual dice role can also be described by a random variable which simply uses the value of the dice.

In our single-dice problem the probabilities of each event was trivial as all were equal. The two-dice situation has a different probability distribution since not every event has the same likelihood. In the next sections we will describe how we can define these distributions.

### Discrete probability distributions

In the case of a discrete random variable we can define a probability distribution $P$ that maps events (subsets of outcomes) to some value:

\begin{equation}
P(\Omega) := \{A \subseteq \Omega\} \rightarrow \mathbb{R}
\end{equation}


with $\Omega$ beging the set of possible outcomes. For discrete random variables this distribution is called a _probability_mass function} and is usually described as (for a random variable $X$):

\begin{align}
f _ {X}(x) = P(X = x) & = P(\{\omega \in \Omega\; |\; X(\omega) = x\})\\
& = \sum _ {X(\omega) =  x} P(\omega)\nonumber
\end{align}

which states that we compute the probability of all the outcomes ($\omega \in \Omega$) that result in the given event $x$. The distribution has the following characteristics:

\begin{eqnarray}
P(\Omega) & = & 1\\
\forall A \subseteq \Omega,\; P(A) &\geq & 0 \\
A \cap B = \emptyset \Rightarrow P(A \cup B) & = & P(A) + P(B)
\end{eqnarray}

which can be explained as: all the possible outcomes lay in $\Omega$, all probabilities are non-negative and outcomes which are independent can be simply added. This last characteristic is, possibly, the least intuitive but can be explained with a simple example: Consider our two dice example. As individual throws are independent we can simply say: $P(even) = P(2)+P(4)+P(6)+P(8)+P(12)$.

The expected value or mean of a discrete random variable can easily be defined as:

\begin{equation} 
E[X] = \sum _ {i=1}^{n} x _ {i} f _ {X}(x _ {i})
\end{equation}



### Continous probability distributions

When $\Omega$ is a continuous set, the probabilities are not assigned to values but to intervals. Namely, as the space of values is infinite the probability of a single value is practically zero. To compute the probability of an interval, an integral can be used over the range of that particular interval. So, given a probability distribution function $f _ {X}(x)$, the probability that an outcome $x$ lays within an interval $[a,b]$ can be defined as:

\begin{equation}
P(a \leq x \leq b) = \int _ {a}^{b} f _ {X}(x) dx
\end{equation}


with the following characteristics:

\begin{eqnarray}
\forall x \in \mathbb{R},\; f _ {X}(x) & \geq & 0\\
\int _ {-\infty}^{\infty} f _ {X}(x) dx & = & 1\\
A \cap B = \emptyset \Rightarrow P(A \cup B) & = & P(A) + P(B)
\end{eqnarray}

where $A$ and $B$ can be seen as two non-overlapping intervals. Note that these characteristics are analogous to those of discrete random variables. If $f _ {X}(x): \mathbb{R} \to \mathbb{R}$ then $f _ {X}$ is called a _probability_density function (pdf)} of $X$. The expected value or mean of a continuous probability distribution can be computed with:

\begin{equation}
E[X] = \int _ {-\infty}^{\infty} x f _ {X}(x)\; dx
\end{equation}


### Gaussian distribution

A special variant of the continuous probability distribution is the _gaussian_distribution} (or normal distribution). For a variable $X$ to be gaussian distributed, its probability density function is defined by:

\begin{equation}
f _ {X}(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}}
\end{equation}


with $\mu$ the mean and $\sigma$ describing the standard deviation of the distribution. The constant  $\frac{1}{\sigma\sqrt{2\pi}}$ assures that the area under the curve is equal to one. When $\mu$ is $0$ and $\sigma$ is 1 we speak of a _standard_normal} distribution.

### Joint probability distributions

Until this point we only considered univariate distributions; i.e. a probability distribution of only one random variable or a random variable that combines multiple variables in to one (as with the example of predicting an even result from two dice). When we have more than one random variable, the distribution becomes a _multivariate_ or _joint_probability distribution}. Such a set of random variables is usually called a _random_vector}. In the following section we will expand on this topic.

### Stochastic (or random) process

Apart from looking at individual random variables, we can also investigate series. A _random_ (or _stochastic_) _process_ is, in its most simple definition, a collection of random variables. It models the development of a system in which the transfer between states is non-deterministic (therefore `random') and can be defined as:

\begin{equation}
\{ X _ {t}\; |\; t \in T\}
\end{equation}


with $T$ being an ordered set, $T \subseteq [0, \infty)$, which in most cases represents time or space\footnote{For convenience we will, in these descriptions, describe $T$ as time.} and each $X _ {t}$ begin a random variable. We can use a random process to model some system that changes through time in a non-predictable way. This is in contrast to a deterministic system in which the steps are known given knowledge about the initial state. An example of a random process is the stock price of a company observed over time.

A random process can be continuous or discrete; e.g. when time is used, the process can be continuous (it can take any value within the time interval) or discrete (days, minutes, hours, etc.). Regardless of the type of the process, the random variables the process consists of can also be continuous or discrete; i.e. a continuous processes can consist of discrete variables and vice versa. A random process can have many different outcomes, defined by its random factors. Each outcome is a function of time and is called a _sample_function} (or possibly more intuitive: a _sample_path}).

To say something about the state of a random process at a specific point in time $t$ we can calculate the mean of the random process. The mean is a function of time:

\begin{equation}
\label{eq:rpmean}
\mu _ {X}(t) = E[X(t)]
\end{equation}


In other words: the mean of a process $X$ at time $t$ is the expected value of the random variable at that specific point in time.

\subsubsection{Simple example: plant growth}

Consider modelling the growth of a simple plant after 10 days (i.e. a discrete interval of $[0,10]$). Lets say that at $t _ {0}$ our plant has a height of 1cm and, in our toy world, the daily growth is described by a random variable $G$ from a uniform distribution $\mathcal{U}[1,3]$\footnote{Clearly, this is not a good model of real plant growth.}. We can define a random process with:

\begin{equation}
\{ X _ {t}\; |\; t \in [0,1, \ldots, 10]\}

$$\end{equation}
\begin{equation}
X _ {t} = 1 + Gt
\end{equation}


From this follows automatically that $X _ {0} = 1$. The randomness of our process is defined by $G$, so for every $g \in \mathcal{U}[1,3]$ we obtain a sample function for $X _ {t}$ in the form of: $f(t) = 1 + gt$. Using the definition of the probability density function of an uniform distribution\footnote{The pdf of a uniform distribution $\mathcal{U}[a,b]$ is defined as $pdf(x) = \begin{cases}\frac{1}{b-a} & \text{if } a \leq x \leq b\\ \\0 & \text{otherwise}\end{cases}$} we can define the function of our random variable $G$:

\begin{equation}
f _ {G}(x) =
\begin{cases}
\frac{1}{3 - 1} & \text{if } 1 \leq x \leq 3\\
0 & \text{otherwise}
\end{cases}
\end{equation}


Using the pdf we calculate the expected height of our plant at $t _ {10}$:

\begin{align}
	E[X _ {t}] & = 1 + E[Gt]\\
	E[X _ {10}] & =  1 + E[10G]\\
	& = 1 + 10 E[G]\nonumber\\
	& = 1+ 10\int _ {1}^{3} g f _ {G}(g)\; dg\nonumber\\
	& = 1 + 10\int _ {1}^{3} \frac{1}{2}g \;dg\nonumber\\
	& = 1 + 10 [\frac{1}{4} g^{2}] _ {1}^{3}\nonumber\\
	& = 1 + 10 [2.25 - 0.25]\nonumber\\
	& = 21\nonumber
\end{align}

\begin{figure}[htbp]
\begin{center}
\includegraphics[width=\textwidth]{img/gp _ ex _ plant}
\caption{Visualisation of the plant growth model. The great coloured area models all possible heights at a given time. The center line gives the expected value at each day given the uniform growth distribution.}
\label{default}
\end{center}
\end{figure}


### Relations between variables

Using the mean of a random process we can express something about the state of the process at a specific time or space. However, we cannot say anything about the relation between two points, e.g. $X _ {1}$ and $X _ {2}$. For this we can define the correlation ($\rho$) and covariance ($cov$) between two variables with:

\begin{align}
\label{eq:rpcorr}
\rho(X _ {1}, X _ {2}) & = \frac{E[(X _ {1} - \mu _ {1}) (X _ {2} - \mu _ {2})]}{\sigma _ {1}\sigma _ {2}}\\
& =  \frac{E[(X _ {1} - E[X _ {1}]) (X _ {2} - E[X _ {2}])]}{\sigma _ {1}\sigma _ {2}}\nonumber\\
\label{eq:rpcov}
cov(X _ {1}, X _ {2}) & = E[(X _ {1} - E[X _ {1}]) (X _ {2} - E[X _ {2}])\\
(& = E[X _ {1}X _ {2}] - E[X _ {1}]E[X _ {2}], \text{ alternate form})\nonumber
\end{align}

The covariance function is an important property of a special form of random proceses, namely _Gaussian_processes}. We will explain these processes in a later section. In many cases, including Gaussian processes, we are interested in the covariance between one variable and all others. For this we introduce a new notation for covariances: the covariance matrix, $\mathbf{\Sigma}$. The covariance matrix is defined as an $n \times n$ matrix with elements:

\begin{align}
\mathbf{\Sigma} _ {ij} & = cov(X _ {i}, X _ {j})
\end{align}

## Gaussian Processes

A random process, a collection of random variables, is said to be a _Gaussian_process (GP)}\footnote{We follow here the definitions as described by \cite{Rasmussen2006a, Rasmussen2006, Barber2012}.} if any finite number of these variables have a joint Gaussian distribution; i.e. the relation between variables follows a Gaussian distribution, this says something about the smoothness of functions generated by these processes.

As we will shift to more complex situations (and input data) we will switch notations from from $X _ {t}$ to a more general $f(\mathbf{x})$ in which $\mathbf{x}$ is the input vector. Mathematically, a Gaussian process $f$ is defined by its mean ($m$) and covariance function (the kernel, $k$)\todo{Explain why these are called kernels (see also lawrence2005), covariance functions are valid mercer kernels}:

\begin{equation}
f \sim \mathcal{GP}(m(\mathbf{x}), k(\mathbf{x} _ {i}, \mathbf{x} _ {j}))
\end{equation}


This states that $f$ is distributed as a gaussian process. Here $m$ and $k$ are functions, in contrast to  single values (univariate) or vectors and matrices (multivariate) with Gaussian distributions. So, a GP can be seen as a generalisation of a gaussian distribution on a random vector. A GP is a non-parametric model as the parameters of the model (the values of the mean and covariance function) are not known beforehand and are derived from data.

A multivariate Gaussian distribution is defined on a random vector. Each element in the vector denotes a random variable; i.e. the variables are indexed by their position. For a GP there is no such index. Instead, we have $\mathbf{x}$ which is used to indicate the random variables. For each $\mathbf{x} _ {i}$ there is a random variable $f(\mathbf{x} _ {i})$ which is the value of the GP $f$ at that location.

The mean and covariance functions are described as (analogous to \ref{eq:rpmean} and \ref{eq:rpcov}):

\begin{align}
m(\mathbf{x}) & = E[f(\mathbf{x})] \; ( = 0, \text{often used for simplicity})\\
cov(\mathbf{x} _ {i}, \mathbf{x} _ {j}) = k(\mathbf{x} _ {i}, \mathbf{x} _ {j}) & = E[(f(\mathbf{x} _ {i}) - \mu(\mathbf{x} _ {i}))   (f(\mathbf{x} _ {j}) - \mu(\mathbf{x} _ {j}))]
\end{align}

For simplicity, the mean function $m(x)$ is usually taken to be zero, e.g. $m(\mathbf{x}) = \mathbf{0}$ where $\mathbf{0}$ is a zero-vector.  This usually does not limit the model as predictions do not have to have a zero-mean. A zero mean function can be a characteristic of the data or achieved by preprocessing. The covariance is an important aspect of GPs: a GP requires that the covariance between two function values ($f(\mathbf{x} _ {i}), f(\mathbf{x} _ {j})$) depends on the covariance of the input values ($\mathbf{x} _ {i}, \mathbf{x} _ {j}$):

\begin{equation}
cov(f(\mathbf{x} _ {i}), f(\mathbf{x} _ {j})) = k(\mathbf{x} _ {i}, \mathbf{x} _ {j})
\end{equation}


Here $k$ is the kernel function, we will explain in Section \ref{app:gp:train} how to choose this function.


\todo[inline]{Key aspect: We want assumptions about the characteristics of the underlying function of the data. If we didn't do this, every function that would fit the data would be equally valid. Two sets of approaches: restrict or add probabilities. First: eg only consider linear functions of the input. Second: assign a probability to each possible function where a high p means more likely}

### Noisy processes

In many real-world examples the function values are not known directly due to noise. This can be the result of measurement noise but can also be a characteristic of the system or caused by external factors (such as noise in wireless signals). So instead of observing $f(\mathbf{x})$ we observe:

\begin{equation}
	\label{app:gp:noisyprocess}
	y _ {i} = f(\mathbf{x} _ {i}) + \epsilon
\end{equation}


where each $\mathbf{x} _ {i}$ is an input sample (from $\mathbb{R}^{d}$, with $d$ the dimension) and $y _ {i}$ the target or observation. $\epsilon$ models the noise and describing the noise variance. This noise also changes the definition of the GP:

\begin{equation}
f \sim \mathcal{GP}(m(\mathbf{x}), k(\mathbf{x} _ {i}, \mathbf{x} _ {j}))

$$\end{equation}
\begin{equation}
\label{eq:covy}
cov(y _ {i}, y _ {j})  = k(\mathbf{x} _ {i}, \mathbf{x} _ {j}) + \sigma _ {n}^{2} \delta _ {ij}

$$\end{equation}
\begin{equation}
y \sim \mathcal{GP}(m(\mathbf{x}), k(\mathbf{x} _ {i}, \mathbf{x} _ {j}) + \sigma _ {n}^{2} \delta _ {ij})
\end{equation}


here $\delta _ {ij}$ is the Kronecker's delta ($1 \text{ iff } i = j$). So, for identical points ($i=j$), the covariance function is defined by the signal covariance and the noise covariance. This only applies to identical points as the noise is assumed to be independent.

\begin{figure}[hbt!]
        \centering
        \begin{subfigure}[b]{0.5\textwidth}
                \includegraphics[width=\textwidth]{img/gp _ ex _ 1}
                \caption{GP before optimisation}
        \end{subfigure}%
        ~ %add desired spacing between images, e. g. ~, \quad, \qquad, \hfill etc.
          %(or a blank line to force the subfigure onto a new line)
        \begin{subfigure}[b]{0.5\textwidth}
                \includegraphics[width=\textwidth]{img/gp _ ex _ 2}
                \caption{GP after optimisation}
        \end{subfigure}
        
        \begin{subfigure}[b]{0.5\textwidth}
                \includegraphics[width=\textwidth]{img/gp _ ex _ 21}
                \caption{GP before optimisation}
        \end{subfigure}%
        ~ %add desired spacing between images, e. g. ~, \quad, \qquad, \hfill etc.
          %(or a blank line to force the subfigure onto a new line)
        \begin{subfigure}[b]{0.5\textwidth}
                \includegraphics[width=\textwidth]{img/gp _ ex _ 22}
                \caption{GP after optimisation}
        \end{subfigure}
        
        \caption{Application of a zero-mean, squared-exponential kernel GP on a random dataset (blue plusses) generated using $y = 2\sin(\frac{1}{2}x) + \epsilon$ (figures a, b) and $y = \frac{1}{4}x^{2} + \epsilon$ (figures c, d) where $\epsilon \sim \mathcal{N}(0,1)$. The dark line shows the posterior mean (sampled using very small intervals), the green area the posterior variance. In (a) and (c) no optimisation of the hyperparameters has been performed, its clearly visible that, although the model follows roughly the structure of the underlying function, it captures to much of the noise in the data. In (b) and (d) the parameters have been optimised, resulting in a better model of the mean and variance. Figures have been generated using the Python _pyGPs_ package.}
        \label{fig:app:gpex1}
\end{figure}



### Prediction using Gaussian processes

Here we consider regression (as opposed to classification) on noisy data. Given training data $D$ consisting of $n$ input-output pairs $(\mathbf{x} _ {i}, y _ {i})$ with $\mathbf{x} _ {i} \in \mathbb{R}^{d}$ and $y _ {i} \in \mathbb{R}$, we define the whole training data as $D = \{\mathbf{X}, \mathbf{y}\}$ with $\mathbf{X}$ the matrix of input values and $\mathbf{y}$ the observations. $\mathbf{X}$ has dimensions $n \times d$ and $\mathbf{y}$ is a vector of $n \times 1$. We define the covariance matrix on $\mathbf{y}$ with

\begin{equation}
\mathbf{\Sigma}(\mathbf{y}) = K(\mathbf{X}, \mathbf{X}) + \sigma _ {n}^{2} \mathbf{I}
\end{equation}
$$ 


where $\mathbf{I}$ is the identity matrix and $K$ the kernel on the input values. In other words, the covariance matrix is an $n \times n$ matrix with values as defined in Equation \ref{eq:covy}. For notational simplicity we will use $\mathbf{\Sigma}$ to describe the matrix (as opposed to $\mathbf{\Sigma}(\mathbf{y})$). Using our covariance matrix we can describe our process as:

\begin{equation}
p(\mathbf{y} | \mathbf{X}) \sim \mathcal{N}(\mathbf{y} | \mathbf{0}, \mathbf{\Sigma})
\end{equation}


Now we introduce a new data point $(\mathbf{x} _ {*}, y _ {*})$ where $\mathbf{x} _ {*}$ is observed and we want to predict $f _ {*}$ (short for $f(\mathbf{x} _ {*})$). Note that we here focus on the _function_value} instead of a noisy observation; using our data consisting of noisy observations we aim to predict the clean signal given some new input $\textbf{x} _ {*}$. We can write a joint distribution on our train data and the new point:

\begin{equation}
\label{eq:app:pyfstar}
p(\mathbf{y}, f _ {*} | \mathbf{X}, \mathbf{x} _ {*}) \sim \mathcal{N}(\mathbf{y}, f _ {*} | \mathbf{0}, \mathbf{\Sigma}^{+})
\end{equation}


\begin{equation}
\label{eq:app:sigmap}
\mathbf{\Sigma}^{+} = 
\begin{bmatrix}
K(\mathbf{X}, \mathbf{X}) + \sigma _ {n}^{2} \mathbf{I} & K(\mathbf{X}, \mathbf{x} _ {*}) \\
K(\mathbf{x} _ {*}, \mathbf{X}) & K(\mathbf{x} _ {*} \mathbf{x} _ {*})
\end{bmatrix}
\end{equation}


where $\mathbf{\Sigma}^{+}$ is the extended covariance matrix, $K(\mathbf{x} _ {*}, \mathbf{X}) = K(\mathbf{X}, \mathbf{x} _ {*})^{T}$ and $\mathbf{0}$ a zero-vector with length $n+1$. Note that for a non-noisy process the term $\sigma _ {n}^{2}\mathbf{I}$ can be simply omitted. 

We are however interested in the conditional probability of $f _ {*}$ given the data. For this we must convert the joint distribution (\ref{eq:app:sigmap}) to by conditioning it using the theorem:

\begin{align}
\label{eq:app:conditioning}
p(\mathbf{x}, \mathbf{y})& \sim \mathcal{N}\left(\mathbf{a}, \mathbf{b}\; \middle|
\begin{bmatrix}
A & C\\
C^{T} & B
\end{bmatrix}\right) \implies\nonumber\\
p(\mathbf{x} | \mathbf{y})& \sim \mathcal{N}(\mathbf{a} + CB^{-1}(\mathbf{y} - \mathbf{b}), A-CB^{-1}C^{T})
\end{align}

We can now compute the predictive distribution for $f _ {*}$ given Equations \ref{eq:app:pyfstar} and \ref{eq:app:conditioning}:

\begin{align}
p(f _ {*} | x _ {*}, D) & = p(f _ {*} | x _ {*}, \mathbf{X}, \mathbf{y}) \sim \mathcal{N}(f _ {*} | m _ {D}, k _ {D}))\label{eq:app:fstar}\\
m _ {D} & =  K(\mathbf{x} _ {*}, \mathbf{X})[K(\mathbf{X},\mathbf{X}) + \sigma _ {n}^{2}\mathbf{I}]^{-1}\mathbf{y},\\ 
k _ {D} & = K(\mathbf{x} _ {*}, \mathbf{x} _ {*}) - K(\mathbf{x} _ {*}, \mathbf{X})[K(\mathbf{X},\mathbf{X}) + \sigma _ {n}^{2}\mathbf{I}]^{-1}K(\mathbf{X},\mathbf{x} _ {*})
\end{align}
\todo{Explain this more and/or add algorithmic example. See p19 of Rasmussen.}

The covariance $k _ {D}$ depends not on the observed targets ($\mathbf{y}$) but only on the prior variance ($K(\mathbf{x} _ {*}, \mathbf{x} _ {*})$) subtracted by a positive term that is dependent on the training data; i.e. the training data lowers the variance as it gives us information about the process. Even though we have used a zero-mean function for the GP, the mean of the posterior is not necessarily zero (due to the definition of $m _ {D}$). Note that we followed Equation \ref{eq:app:conditioning} and that our joint probability (Equation \ref{eq:app:pyfstar}) has a zero mean. Predicting a set of points can be done by replacing $f _ {*}$ by a vector $\mathbf{f} _ {*}$.

### Training a Gaussian process
\label{app:gp:train}

As we saw a GP is defined by its mean and covariance function and, in the case of a noisy process, also the noise variance. The process of training a GP consists of defining these functions based on the training data using two steps:

\begin{enumerate}
	\item \textbf{Model selection}: choosing the functional form of the mean and covariance functions.
	\item \textbf{Adapting hyperparameters}: optimising the parameters of the functions given the training data.
\end{enumerate}



\subsubsection{Model selection}

In GP's we have to define two priors on the model: the mean and covariance functions. The mean function is usually defined as a zero-vector. The choice of the covariance function is however of great importance as it defines the interaction between consecutive datapoints. An often used covariance function is the _Gaussian_ or _squared_exponential kernel} which, in its most simple form, can be defined as:

\begin{equation}
	k(x _ {i}, x _ {j}) = \exp(-|x _ {i} - x _ {j}|^{2})
\end{equation}


However, most of the time extra parameters are added to tune the kernel:

\begin{equation}
	k(x _ i, x _ j) = \sigma _ f^2 \exp \left( -\frac{1}{2l^2} |x _ i - x _ j|^2  \right)	
\end{equation}


with the variance given by $\sigma _ f^2$ and the length scale of the correlation strength is given by $l$. These two parameters control the smoothness of the functions generated by the Gaussian process. The squared-exponential kenel is a stationary covariance function as the kernel only depends on the distance between the inputs.
 
\subsubsection{Hyperparameter optimisation}


The covariance functions usually have one or more _hyperparameters_; e.g. the squared-exponential kernel discussed before has two ($\sigma _ f^2$ and $l$). These parameters are called _hyper_parameters as they are parameters of a non-parametric model. Using training data these hyperparameters can be optimised.

This training can be performed by computing the probability of the data given the hyperparameters $\theta$ using the _log_marginal likelihood} (or sometimes called the evidence):

\begin{equation}
\log p(\mathbf{y} | \mathbf{X}, \theta) = - \frac{1}{2}\mathbf{y}^{T}\mathbf{\Sigma}^{-1}\mathbf{y} - \frac{1}{2} \log \det(\mathbf{\Sigma}) - \frac{n}{2} \log 2 \pi
\end{equation}
$$
odo{We can explain the specific functions of each term, see Rasmussen 2006}

Note that we assume a zero mean GP in above definition of the likelihood. By maximising the marginal likelihood we can find the most optimal hyperparameters given the data; Figure \ref{fig:app:gpex1} shows an example of the effect of the hyperparameter optimisation.

