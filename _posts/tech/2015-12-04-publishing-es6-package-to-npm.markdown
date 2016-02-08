---
layout: post
title:  "Publishing an ES6/ES2015 package to NPM"
date:   2015-12-28 20:08
categories: blog tech
tags: [javascript, es6, babel, npm, package]
published: true
---

When I can, every javascript project I start makes use of the new ES2015 (or ES6) standard. The features (better classes, arrow functions, etc.) are just to good to ignore, and, using a transpiler such as [Babel](https://babeljs.io/), code can be made compatible with older browsers and systems.

For private projects the transpiler can be incorporated in to the build process. But, how do we proceed when we want to make a project public and usable by others? This is particular important when we publish a package to NPM. **NPM packages should run on "ES5 systems"**.

Recently I wanted to practice a bit more with publishing to NPM and decided to use my micro library [KalmanJS]({% post_url 2015-09-25-lightweight-javascript-library-for-noise-filtering %}) as an example. In this post I will show you **how to go from an ES6 library to an ES5 compatible package**.

*Small note:* This post focusses on an *Occam's Razor* approach to the ES5&rarr;ES6 problem. I will not use modules or build systems (like *gulp*, *grunt* or *webpack*) but instead focus on the bare minimals. It is often not required to use elaborate setups and when needed, a simple setup, like the one discussed here, can be easily extended.

## Project init

As usual, I started by creating a `package.json` file for my project. The easiest option is to run `npm init` and subsequently answer all the questions. All the values you enter will end up in your `package.json` file. See the NPM docs about [init](https://docs.npmjs.com/cli/init) and [package.json](https://docs.npmjs.com/files/package.json) if you need some extra information.

Nothing fancy so far, just the regular NPM setup!

## Installing requirements

To convert ES2015 code we will use a transpiler. [Babel](https://babeljs.io/) is, in my opinion, the current best option. To use Babel we need to add some dependencies to our project, like so:

`npm install babel-cli --save-dev`

The new Babel 6 setup uses plugins to configure everything. To transpile ES2015 we need the ES2015-plugin:

`npm install babel-preset-es2015 --save-dev`

Note that we append `--save-dev`: the transpiler is only required for development. An application that uses our library will use the transpiled version and does not need these requirements.

What's next? Well, in terms of requirements, *nothing*. You could add something like [UglifyJS](https://github.com/mishoo/UglifyJS2) to minify you code, but it is not requirement. You could use [eslint](https://github.com/eslint/eslint) to check your code, but, again, it is not required.

## Project structure

Since the `package.json` file has been created and the requirements have been added, we can create the rest of the files that are needed. Our project structure will end up like the following:

<pre>
- src/lib.js
- lib/
- .babelrc
- .gitignore
- .npmignore
- package.json
- README.md
</pre>

* `src/` Here we store all the ES6 source files. In this example it will be a single file: [`kalman.js`](https://github.com/wouterbulten/kalmanjs/blob/master/src/kalman.js).
* `lib/` This is the ES5 output directory of our project. You don't add things manually here, Babel will take care of this.
* `.babelrc` contains all the transpiler config.
* `.gitignore` contains everything that git should ignore (hint: the ES5 files).
* `.npmignore`, all files that we do not want in our package (hint: our ES6 files).
* `package.json` consists of the NPM configuration.
* `README.md` Write something useful in this file 😉, it will be shown on the NPM page.

### .babelrc

Create a new file in your root directory and name it `.babelrc`. In this file add the following:

{% highlight javascript %}
{
  "presets": ["es2015"]
}
{% endhighlight %}

This single line tells Babel to use the ES2015 preset. You can also use command line parameters to set the transpiler config but I prefer using a `.babelrc`. This makes it a bit easier to understand what Babel will do without having to look at the build command.

### .gitignore

You probably already have a `.gitignore` file. To make sure that our transpiled ES5 files do not end up in our repository add the `lib` directory to it.

### .npmignore

`.npmignore` has the same function as the `.gitignore` file but defines everything we want to exclude in our published package. Here we can add everything that a end user should not need. In our case:

<pre>
src
.babelrc
</pre>

*Note:* NPM also ignores everything from your `.gitignore` file, so no need to define things twice.

## Creating NPM scripts

As promised we will not use any external build system. Instead we use NPM scripts (small commands that NPM can execute) to build our files. In your `package.json` file there should be an `scripts` entry (usually this contains an empty test command).

The first script we add is our compile step:

<pre>
"compile": "babel --source-maps -d lib/ src/"
</pre>

Now when you run `npm run compile`, Babel will scan all files in the `src` directory, transpile your ES6 code to ES5, and store the result in the `lib` directory. The `--source-maps` flag is added to generate source maps (which help with debugging code) but this is fully optional.

Our second script is called `prepublish`. This is a special script that is executed automatically when you publish a package to the NPM repository. In this script we define all the steps that have to be executed before we can publish our package. In our case, this is simple:

<pre>
"prepublish": "npm run compile"
</pre>

This tells NPM to compile our code before it is published to the repository.

If you have any other steps that need to be execuded (e.g. a minify step) you can add them here. For KalmanJS the full list of scripts is the following:

<pre>
"scripts": {
  "compile": "babel --source-maps -d lib/ src/",
  "minify": "uglifyjs lib/kalman.js --compress --preamble '//kalmanjs, LGPL-3.0, https://github.com/wouterbulten/kalmanjs' --source-map lib/kalman.min.js.map --in-source-map lib/kalman.js.map --mangle -o lib/kalman.min.js",
  "prepublish": "npm run compile && npm run minify"
},
</pre>

## Testing & Publishing to NPM

With our scripts defined we are done! You can now test your project as usual and, when everything succeeds, push it to the NPM registry. The NPM docs has a [nice overview](https://docs.npmjs.com/misc/developers#before-publishing-make-sure-your-package-installs-and-works) of the test procedures you can/must follow before publishing. I definitely recommend running through those steps at least once to see if it all works.

After your last checks you can simply push the project to NPM:

<pre>
npm publish
</pre>

If you followed the steps you will see something similar to this:

<pre>
➜  kalmanjs git:(master) npm publish

> kalmanjs@1.0.0-beta prepublish /..../kalmanjs
> npm run compile && npm run minify

-
> kalmanjs@1.0.0-beta compile /..../kalmanjs
> babel --source-maps -d lib/ src/

src/kalman.js -> lib/kalman.js
/
> kalmanjs@1.0.0-beta minify /..../kalmanjs
> uglifyjs lib/kalman.js --compress --preamble '//kalmanjs, LGPL-3.0, https://github.com/wouterbulten/kalmanjs' --source-map lib/kalman.min.js.map --in-source-map lib/kalman.js.map --mangle -o lib/kalman.min.js

+ kalmanjs@1.0.0-beta
</pre>

Your ES6 code is transpiled and uploaded. Congrats! 🎉
