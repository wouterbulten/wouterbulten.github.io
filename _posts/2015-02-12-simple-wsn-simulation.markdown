---
layout: post
title:  "Simple WSN Simulation with Matplotlib Animations"
date:   2015-02-13 14:44
categories: blog slac
tags:
image: /assets/article_images/wsn_sim.png
---

My internship and thesis revolves around _WSNs_: Wireless Sensor Networks. To get some more insights in the workings of these networks and I built a small simulator in Python. The full source can be found on the [SLACTest](https://github.com/wouterbulten/SLACTest)[^1] repository on GitHub.

The setup of the simulation is simple: a fixed world (without obstructions) contains a set of nodes. A subset of these nodes are fixed (i.e. Access Points or AP's) and the rest is moving (e.g. users, usually one). All nodes are randomly places within the boundaries of the world, all moving nodes are initialised with a random movement (speed and direction).

<video width="100%" controls>
  	<source src="/assets/movies/sim_20150210172159.mp4" type="video/mp4">
	Your browser does not support the video tag.
</video>

> An example simulation consisting of 100 static access points and one moving node. The blue line is the movement trace of the user. The left figure represents the simulated world. The right is the predicted movement trace of the user based on signal strengths measurements (using PCA); this I will address in a seperate post.

For breivity I won't show the full source code here (see the [repo](https://github.com/wouterbulten/SLACTest)) but only the relevant parts. The movement of the users is a simple bounce or pinball effect:

{% highlight python linenos %}
def move(self):
	xn = max(min(self.x + math.cos(self.r) * self.s, self.maxX), 0)
	yn = max(min(self.y + math.sin(self.r) * self.s, self.maxY), 0)
	
	if xn == 0 or xn == self.maxX:
		self.r = math.pi - self.r
	elif yn == 0 or yn == self.maxY:
		self.r = 2 * math.pi - self.r
	
	self.moveToPosition(xn, yn)
{% endhighlight %}

Running the simulation only requires setting up a specific controller with the appropriate nodes:

{% highlight python linenos %}
# Create a new world
world = env.World(xMax, yMax)
# Instantiate nodes with a random position
nodes = [wsn.FixedAP(maxX = world.getMaxX(), maxY = world.getMaxY()) for x in range(0, fixedNodes)]
user = wsn.MovingAP(maxX = world.getMaxX(), maxY = world.getMaxY())
nodes.append(user)

# Create a network controller, containing the world and nodes
controller = NetworkController(world, nodes, False)
# Initialize the world, gives nodes initial speed and direction
controller.initialize()

# Simulate movement in the network
for i in range(0, steps):
	
	# Update the total network
	controller.iterate()
{% endhighlight %}

## Creating a moving figure

The most difficult part of the whole simulator is not simulating movement or the world state, its the visualization. [Matplotlib](http://matplotlib.org) has support for animations[^2] but the documentation is not as extensive as for the other types of plots. The most [basic example](http://matplotlib.org/1.4.2/examples/animation/basic_example.html) uses a update function to plot every frame (through _FuncAnimation_). For the WSN simulation I opted for the subclassing method:

{% highlight python linenos %}
class PlaybackAnimation(animation.TimedAnimation):
    '''
    Animator object
    '''
    def __init__(self, &#x3C;plot data&#x3E;):
         
    	# Setup a figure object
        fig, (combAx, predAx) = plt.subplots(1, 2, squeeze=True, figsize=(24,10)  )

       	# Setup your plots here as you would normally do
       	# self.plt = ...

        animation.TimedAnimation.__init__(self, fig, interval=100, blit=True)
      
    def show(self):
        self.plt.show()
          
    def _draw_frame(self, iteration):

        # Update the data of your plots
        # You can retrieve the data with:
        #	yourplt.get_data()
        # and set the data with:
        #	yourplt.set_data(x, y)
                
        # This step is important as it tells the animation which plots have been updated
        # Set _drawn_artists to a list of all the plot objects that have changed.
        self._drawn_artists = [ plots ]
        
    def _init_draw(self):
    	# Init all plots by setting there data to zero, e.g.:
        # self.plt.set_data([], [])
        
    def new_frame_seq(self):
        # here you return an enumerate object describing the length of the animation 
        # e.g.:
        # return iter(range(len(self.data) - 2))
    
{% endhighlight %}

Read the comments in the above snippet for some guidelines during the implementation of your animator. The animation can then be showed using the _show()_ function or it can be saved to a file (make sure that you have a version of _ffmpeg_ installed):

{% highlight python linenos %}
anim = PlayBackAnimation(data) 
anim.save("simulation.mp4", writer="ffmpeg")
{% endhighlight %}


## Closing remarks

Creating this simulation showed me one thing: sometimes it takes you more work to show what you have done (i.e. showing the simulation) than doing the actual work self (the world model). In Python, creating the world and simulating the nodes is trivial and very easy. Unfortunately, the animation capabilities of Matplotlib are a bit more difficult and underdocumented. If your focus is primarily animating than you're better off with something like Matlab. 

[^1]: The repo contains the full SLAC project in which I combine Gaussian Processes with localization.
[^2]: [Matplotlib animation API](http://matplotlib.org/api/animation_api.html)