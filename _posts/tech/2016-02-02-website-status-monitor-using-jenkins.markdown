---
layout: post
title:  "Website status monitor using Jenkins"
date:   2016-02-02 23:12
categories: blog tech
tags: [jenkins, dsl, http, groovy, shell]
published: true
description: "Jenkins is a great tool for continuous integration and deployment. It can also be used for monitoring websites that are live. In this post I'll show you my approach using a simple shell script."
---

Jenkins is a great tool for continuous integration and deployment. In a sense, and greatly simplified, it is a very complex and feature rich task runner. I already use it for testing development applications (e.g. with Mocha, PHPUnit, etc.) but was wondering whether it could also keep track of applications in an production environment. This gave me the idea to build a Jenkins job for monitoring live websites.

In this post I'll show you how to create a **website monitoring tool in Jenkins** using the DSL approach and a shell script.

## Creating a test script

First we'll need some method of testing a website's status. This part has nothing to do with Jenkins itself. The most simple way is using a shell script and a cURl request. The following command tries to access a website defined in `$url` and returns the status code:

{% highlight bash %}
#!/bin/bash

url='http://website-to-test'
code=`curl -sL --connect-timeout 20 --max-time 30 -w "%{http_code}\\n" "$url" -o /dev/null`
{% endhighlight %}

`--connect-timeout` and `--max-time` are added to make sure that we eventually give up. The server can become unresponsive and we also want to detect these kinds of events. After running, `$code` contains the http status code or '0' in case of a failure. Given the status code we can react on the result:

{% highlight bash %}
#!/bin/bash

...

if [ "$code" = "200" ]; then
  echo "Website $url is online."
else
  echo "Website $url seems to be offline."
fi
{% endhighlight %}

We can further extend on this approach by wrapping the full check within a loop. By testing the website a few times we can hopefully prevent false negatives. Adding a loop in Bash is fairly simple given you know the syntax:

{% highlight bash %}
#!/bin/bash
url='http://website-to-test'
attempts=5
timeout=5

echo "Checking status of $url."

for (( i=1; i<=$attempts; i++ ))
do
  code=`curl -sL --connect-timeout 20 --max-time 30 -w "%{http_code}\\n" "$url" -o /dev/null`

  echo "Found code $code for $url."

  if [ "$code" = "200" ]; then
    echo "Website $url is online."
    break
  else
    echo "Website $url seems to be offline. Waiting $timeout seconds."
    sleep $timeout
  fi
done
{% endhighlight %}

*Note: Using variables for constants, like the timeout and url, makes it easier to populate this with data from our Jenkins job.*

## Failing a build

We've created our test script and the next step is the Jenkins integration. For this we need some way of communicating the results back to Jenkins. As we are using a shell script, the most simple approach is using return codes: We'll let our script return `0` when everything is online (which will complete the build) or `1` in case of an error. Using the default settings, Jenkins will fail a build (and trigger a failure event) when a shell script returns a non-zero value.

To make this work a simple flag is added to the cURL loop:

{% highlight bash %}
#!/bin/bash
url='http://website-to-test'
attempts=5
timeout=5
online=false

echo "Checking status of $url."

for (( i=1; i<=$attempts; i++ ))
do
  code=`curl -sL --connect-timeout 20 --max-time 30 -w "%{http_code}\\n" "$url" -o /dev/null`

  echo "Found code $code for $url."

  if [ "$code" = "200" ]; then
    echo "Website $url is online."
    online=true
    break
  else
    echo "Website $url seems to be offline. Waiting $timeout seconds."
    sleep $timeout
  fi
done

if $online; then
  echo "Monitor finished, website is online."
  exit 0
else
  echo "Monitor failed, website seems to be down."
  exit 1
fi
{% endhighlight %}

Our script will now test the website multiple times, if all of these tests fail the monitor will fail the build. This is a conservative check: all cURL requests must fail before we report an error. You can also turn this around and fail the build if a single cURL request fails. This can however increase the number of false positives!

## Creating the Jenkins job using DSL

We'll create the Jenkins job using a DSL file. Not sure what a DSL is? It is a great way to programmatically define Jenkins jobs. To quote the Github project page:

> The Jenkins "Job DSL / Plugin" is made up of two parts: The Domain Specific Language (DSL) itself that allows users to describe jobs using a Groovy-based language, and a Jenkins plugin which manages the scripts and the updating of the Jenkins jobs which are created and maintained as a result.
> [DSL Plugin GitHub Page](https://github.com/jenkinsci/job-dsl-plugin)

See for more info the [wiki page](https://wiki.jenkins-ci.org/display/JENKINS/Job+DSL+Plugin) of the plugin. Of course, you also do this all manually but, in general, using DSL files makes managing Jenkins a lot easier.

For your convenience, the full DSL file first (explanation follows below):

{% highlight groovy %}
def recipients = 'youremail@example.com someother@example.com'
def website = 'http://website-we-want-to-test'

//Optional pre-send script, see further in this article for more info.
//If removed, make sure to also remove the 'presendScript' variable
//in the publisher block below.
def localPreSendScript = readFileFromWorkspace('<path to script>/pre_send_script.groovy_script')

//Job identifier, also used for the directory
job('website-monitor') {

  //Name of the job in Jenkins
  displayName('Website status of ExampleWebsite')

  triggers {
      //Run every 5 minutes
      cron('H/5 * * * * ')
  }

  steps {
    environmentVariables {
      env('WEBSITE', websie)
      env('TIMEOUT', 5)
      env('ATTEMPTS', 5)
    }

    //Run a shell script from the workspace
    shell(readFileFromWorkspace('<path to your shell script>/check_status_code.sh'))
  }

  logRotator {
    //Remove logs after two days
    daysToKeep(2)
  }

  publishers {
    extendedEmail(recipients, 'Website is offline') {

      //Events on which a email is sent
      trigger(triggerName: 'Failure', subject: 'Website offline!', body: 'Website ' + website + ' is offline!')
      trigger(triggerName: 'Fixed', subject: 'Website online!', body: 'Website ' + website + ' is back online!')

      //Custom configuration
      configure { node ->
        node << {
          contentType 'text/html'
          //Make sure that recipients mail to each other and not back to the system
          replyTo recipients
          //Optional script for extra conditions
          presendScript localPreSendScript
        }
      }
    }
  }
}
{% endhighlight %}

Now let's run through all the different parts, starting with the trigger. In my case I want to check the website every 5 minutes; this gives a guarantee that there is a maximum downtime of 5 minutes. To do this I define a cron trigger:

{% highlight groovy %}
triggers {
    //Run every 5 minutes
    cron('H/5 * * * * ')
}
{% endhighlight %}

You can of course increase or decrease the interval according to available server resources and importance of the website.

Then we define the actual job steps. We already created a shell script to do the actual checking so we call that using the `shell` function. In this case, the Bash script is in the same repository as my DSL file so I can use the `readFileFromWorkspace` function to load the content. Our environment variables are defined before we run the shell script. By extracting these variables we can use the same shell script for multiple jobs:

{% highlight groovy %}
steps {
  environmentVariables {
    env('WEBSITE', websie)
    env('TIMEOUT', 5)
    env('ATTEMPTS', 5)
  }

  //Run a shell script from the workspace
  shell(readFileFromWorkspace('<path to your shell script>/check_status_code.sh'))
}
{% endhighlight %}

Given that the job will run 288 times a day (12 jobs per hour) the Jenkins logs can become rather full. I advise you to use log rotation and automatically remove old logs. For this specific jobs the logs are not very interesting so there is no real harm in removing them. We usually set the time limit to two days.

{% highlight groovy %}
logRotator {
  //Remove logs after two days
  daysToKeep(2)
}
{% endhighlight %}

Last part (of almost any Jenkins job) is the publisher section: How should Jenkins report the results? We opted for an email system. Every time a website goes offline (or back online) the job sends an email. You could easily extend this with an SMS service or something similar.

The example below makes use of the [Email-ext plugin](https://wiki.jenkins-ci.org/display/JENKINS/Email-ext+plugin) which adds usefull functionality for sending emails (more than used here).

{% highlight groovy %}
publishers {
  extendedEmail(recipients, 'Website is offline') {

    //Events on which a email is sent
    trigger(triggerName: 'Failure', subject: 'Website offline!', body: 'Website ' + website + ' is offline!')
    trigger(triggerName: 'Fixed', subject: 'Website online!', body: 'Website ' + website + ' is back online!')

    //Custom configuration
    configure { node ->
      node << {
        contentType 'text/html'
        //Make sure that recipients mail to each other and not back to the system
        replyTo recipients
        //Optional script for extra conditions
        presendScript localPreSendScript
      }
    }
  }
}
{% endhighlight %}

The job sends an email every time a build fails or when it is fixed (i.e. moved from a failure to a success state). These are the most usefull events for a website monitoring system.

The body and subject can be customized based on your requirements. The plugin can inject additional information into the email using variables. Some useful variables are:

* `${BUILD_NUMBER}`: Current build number, makes every email unique.
* `${BUILD_STATUS}`: Status of the buidl (e.g. FIXED or FAILURE).
* `${PROJECT_URL}`: Direct url to the Jenkins project.
* `${BUILD_URL}`: Direct url to the build.
* `${JENKINS_URL}`: Url of the Jenkins installation.
* `${BUILD_LOG}`: Full build log (tip: wrap this in `<pre>` tags to preserve formatting).

Using these variables you could construct a more extended email like so:

{% highlight groovy %}
def emailTemplate = '' +
    '<h1>[#${BUILD_NUMBER}] ' + website + ' is down (Status: ${BUILD_STATUS})</h1>' +
    '<br><hr><br>' +
    '<p><b>' + website + ' seems to be down after 5 attempts.</b></p>' +
    '<p>This email was automatically generated by the Jenkins Monitoring Job.</p>' +
    '<p>The following users have been notified: <ul><li>' + recipients.replace(' ', '</li><li>') + '</li></ul></p>' +
    '<p><i>Reply to this email to send an email to all recipients automatically.</i></p>' +
    '<a href="${PROJECT_URL}">View project</a> | ' +
    '<a href="${BUILD_URL}">View build</a> | ' +
    '<a href="${JENKINS_URL}">Go to Jenkins</a>' +
    '<br><hr><br>' +
    '<p>Full build log:</p>' +
    '<pre>${BUILD_LOG}</pre>'
{% endhighlight %}

## Preventing multiple emails

When a website goes down the watcher will send an email every 5 minutes, this can easily overflow your inbox. To fix this we need to add an additional restriction on the email publisher.

This restriction is implemented using an pre-send script: a simple Java script that is executed just before an email is sent. This script can then determine whether the email should be sent or not. We already defined the pre-send script in the DSL above through the `presendScript` option in the publisher. I use an extended version of a script I found on [Stack Overflow](http://stackoverflow.com/questions/15173455/jenkins-sending-success-email-only-once-a-day-though-the-job-is-running-hour) with some very important additions.

Every time the build fails the script will check a file in our workspace. If that file does not exist it will be created and the email will be sent. The newly created file acts as a flag. Next time the build fails (e.g. after 5 minutes) the script checks whether the flag file is at least an hour old before a new email will be send out. This limits the amount of emails sent per hour to one.

Additionally, if the website goes online within the hour the flag is removed to make sure any additional errors are reported.

The full script is shown below. Save this to a file in your workspace and load it using the `readFileFromWorkspace` function (see the DSL above for an example).

{% highlight groovy %}

//Build failed, check whether we may send an email
if (build.result.toString().equals("FAILURE")) {
  try {
    long minEmailGap = 1000 * 60 * 60; // Send max 1 email per hour
    def env = build.getEnvironment();
    String ws = env['WORKSPACE']

    //Create a new flag file in the workspace
    File file = new File(ws + "/delay-email-flag.txt");

    if (file.exists() == false) {
      file.createNewFile();
    }
    else {
      long currentTime = (new Date()).getTime();

      if (file.lastModified() + minEmailGap > currentTime) {
        cancel = true; //This stops the Email-Ext plugin sending the email
      }
      else {
        //Send an email and reset the timer
        file.setLastModified(currentTime);
      }
    }
  }
  catch(IOException e) {
    // Something went wrong, send email anyway
  }
}
//Build is successful, re-enable the emails
else if(build.result.toString().equals("SUCCESS")) {
  try {

    def env = build.getEnvironment();
    String ws = env['WORKSPACE']

    File file = new File(ws + "/delay-email-flag.txt");

    if(file.exists()) {

      //Project is fixed, remove the flag file
      file.delete();
    }
  }
  catch(IOException e) {
    // Something went wrong, send email anyway
  }
}
{% endhighlight %}

Note that using this pre-send script is not required, it will just make the job a bit more practical!

## Wrapping up

Using this simple approach you can implement a easy but effective Jenkins website monitor. While it doesn't offer all the fancy features of paid website monitors it gives the most vital information: the status of your website. Using the email plugin you will be notified of any errors within minutes and gives you the possibility to address the issue quickly.

Not using the DSL plugin? Start using it! It makes managing your jobs a lot easier. Still not convinced? You can also manually add the Bash script to a job and work from there! Good luck :)
