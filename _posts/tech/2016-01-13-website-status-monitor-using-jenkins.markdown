---
layout: post
title:  "Website status monitor using Jenkins"
date:   2016-01-13 21:14
categories: blog tech
tags: [jenkins, dsl, http, groovy, shell]
published: false
description: "Jenkins is a great tool for continuous integration and deployment. It can also be used for monitoring websites that are live. In this post I'll show you my approach using a simple bash script."
---

Jenkins is a great tool for continuous integration and deployment. In a sense it is a very complex and feature rich task runner. This gave me the idea to build a Jenkins job for monitoring live websites.


## Creating a test script

First we'll need some method of testing a website's status. The most simple way is using a Bash script and a cURl request. The following command tries to access a website defined in `$url` and returns the status code:

{% highlight bash %}
#!/bin/bash

url='http://website-to-test'
code=`curl -sL --connect-timeout 20 --max-time 30 -w "%{http_code}\\n" "$url" -o /dev/null`
{% endhighlight %}

`--connect-timeout` and `--max-time` are added to make sure that we eventually give up. The server can become unresponsive and we also want to detect these kinds of events. After running `$code` contains the http status code or '0' in case of a failure. Given the status code we can react on the result:

{% highlight bash %}
#!/bin/bash

...

if [ "$code" = "200" ]; then
  echo "Website $url is online."
else
  echo "Website $url seems to be offline."
fi
{% endhighlight %}

We can further extend on this approach by wrapping the full check with a loop. By testing the website a few times we can hopefully prevent false negative. Adding a loop in Bash is fairly simple given you know the syntax:

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

*Note: Using variables for constants like the timeout and url makes it easier to populate this with data from our Jenkins job.*

## Failing a build

We've created our test script but we need some way of communicating the results back to Jenkins. As we are using Bash the most simple approach is using return codes: We'll let our script return `0` when everything is online (which will complete the build) or `1` in case of an error (which will trigger a failure in Jenkins). To make this work a simple flag is added to the cURL loop:

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

We'll create the Jenkins job using a DSL file. Not sure what a DSL is? It is a great way to programmatically define Jenkins jobs. See for more info the great [plugin](https://wiki.jenkins-ci.org/display/JENKINS/Job+DSL+Plugin) that makes this possible. Of course, you also do this all manually.

The full DSL file first:

{% highlight groovy %}
def recipients = 'youremail@example.com'
def website = 'http://website-we-want-to-test'

job('website-monitor') {

  displayName('Website status of ExampleWebsite')

  triggers {
      cron('H/5 * * * * ')
  }

  steps {
    environmentVariables {
      env('WEBSITE', websie)
      env('TIMEOUT', 5)
      env('ATTEMPTS', 5)
    }
    shell(readFileFromWorkspace('<path to your shell script>/check_status_code.sh'))
  }

  logRotator {
    daysToKeep(2)
  }

  publishers {
    extendedEmail(recipients, 'Website is offline') {
      trigger(triggerName: 'Failure', subject: 'Website offline!', body: 'Website ' + website + ' is offline!')
      trigger(triggerName: 'Fixed', subject: 'Website online!', body: 'Website ' + website + ' is back online!')

      configure { node ->
        node << {
          contentType 'text/html'
          replyTo recipients
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
    cron('H/5 * * * * ')
}
{% endhighlight %}

You can of course increase or decrease the interval according to available server resources and importance of the website.

Then we define the actual job steps. We already created a shell script to do the actual checking so we call that using the `shell` function. In my case the Bash script is in the same repository as my DSL file so I can use the `readFileFromWorkspace` function to load the content. Our environment variables are defined before we run the shell script. By extracting these variables we can use the same shell script for multiple jobs:

{% highlight groovy %}
steps {
  environmentVariables {
    env('WEBSITE', website)
    env('TIMEOUT', 5)
    env('ATTEMPTS', 5)
  }
  shell(readFileFromWorkspace('<path to your shell script>/check_status_code.sh'))
}
{% endhighlight %}

Given that the job will run 288 times a day (12 jobs per hour) the Jenkins logs can become rather full. It is therefore advised to use log rotation to automatically remove old logs. In this case the logs are not very interesting so there is no real harm in removing them. We usually set the time limit to two days.

{% highlight groovy %}
logRotator {
  daysToKeep(2)
}
{% endhighlight %}

Last part (of almost any Jenkins job) is the publisher section: How do you want to see the results of the build? We opted for an email system. Every time a website goes offline (or back online) the job sends an email. The example below makes use of the (Email-ext plugin)[https://wiki.jenkins-ci.org/display/JENKINS/Email-ext+plugin] which is a great tool for sending emails from jobs.

{% highlight groovy %}
publishers {
  extendedEmail(recipients, '${BUILD_STATUS} ' + website + ' [#${BUILD_NUMBER}]') {
    trigger(triggerName: 'Failure', subject: 'Website offline!', body: 'Website ' + website + ' is offline!')
    trigger(triggerName: 'Fixed', subject: 'Website online!', body: 'Website ' + website + ' is back online!')

    configure { node ->
      node << {
        contentType 'text/html'
        replyTo recipients
      }
    }
  }
}
{% endhighlight %}
## Manual Jenkins job
