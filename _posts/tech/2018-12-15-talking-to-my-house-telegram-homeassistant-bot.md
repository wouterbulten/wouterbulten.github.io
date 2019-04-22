---
layout: post
title:  "Talking to my house: Building a chat bot with Home Assistant, AppDaemon and Telegram"
date:   2018-12-15 13:00
modified_at: 2019-04-22 16:30
categories: blog tech
tags: [home automation, home assistant, telegram, bots, appdaemon]
#published: true
description: "In this blog post I discuss talking (or chatting) to your home using a Telegram bot. I cover making a new Telegram bot, connecting it to Home Assistant and then building functionality using AppDaemon."
include_ha_series: true

---

Home Assistant (HA) can be easily controlled using the web interface of one of the mobile apps. However, **there are more fun ways to communicate with your home**. In this blog post I discuss talking (or chatting) to your home using a Telegram bot. I show how you can easily make a bot, connect it to Home Assistant and use AppDaemon to build a bot that can give you information on your home.

Best of all, using this setup you can communicate with your home even outside your local network without having to open up Home Assitant. So **no port forwarding required**! The Telegram bot acts as a sort of proxy between you and your HA instance.

## Setting up a new Telegram bot

To start, we need to make a Telegram bot to link with HA. There is an extensive guide at the [Telegram website](https://core.telegram.org/bots). In essence it boils down to a few simple steps:

1. Start a new conversation with the [BotFather](https://telegram.me/botfather). This is a special bot that can be used to manage and create bots.
2. Use the command `/newbot` to start the process of making a bot.
3. Fill in the name of your bot (this is the display name).
4. Fill in the username of your bot (this has to be in the format of `<your_bot_name>bot`).
5. When all is done you will receive a HTTP API token from the BotFather. This is required to connect the bot to HA.

![Setting up a new bot with Telegram using the BotFather.](/assets/images/ha/telegram_bot_new.png)

After creating your bot you can start chatting with it. Note that a user must always start a chat with a bot; a bot cannot start a conversation on its own.

## Connecting a Telegram bot to Home Assistant

To start connecting our new Telegram bot to HA we need to enter our credentials for accessing the bot. We do this by adding a few lines to `secrets.yaml`. If you do not want to use the `secrets` file you can also skip this step and enter the credentials directly.

```yaml

telegram_bot_key: <your api key from the BotFather>
telegram_bot_main_chat_id: <your chat id>
telegram_bot_chat_ids:
  - <your chat id>
  - <optional: other chat ids you want your bot to communicate with>
```

The chat id is the unique number that identifies your Telegram account. If you do not know your chat id you can send `/getid` to one of the 'id'-bots. For example the [IDBot](http://telegram.me/myidbot): [http://telegram.me/myidbot](http://telegram.me/myidbot). The list of chat ids is used to prevent other people talking to your bot.

The next step is to load the Telegram bot in HA. Do this by adding the following lines to your `configuration.yaml` (or to a dedicated package file):

```yaml
telegram_bot:
  - platform: polling
    api_key: !secret telegram_bot_key
    allowed_chat_ids: !secret telegram_bot_chat_ids
```

I am using the polling method for the Telegram bot. Using this method you do not have to open up your Home Assistant instance to the outside world.

We can also link the bot to the [Notify component](https://www.home-assistant.io/components/notify/) of home assistant:

```yaml
notify:
  - name: telegram
    platform: telegram
    chat_id: !secret telegram_bot_main_chat_id
```

## Basis of an AppDaemon Telegram app

[AppDaemon](https://www.home-assistant.io/docs/ecosystem/appdaemon/) is a great tool for building our Telegram bot as we can leverage the flexibility of Python. Alternatively, it is also possible to build your bot totally using yaml files, but that will take a bit more effort.

Start by adding a new instance to your `apps.yaml` configuration for AppDaemon:

```yaml
bot:
  module: telegram
  class: TelegramBot
```

Then create the associated python file (`telegram.py`). To get started, copy the following to the file to use as wireframe:

```python
import appdaemon.plugins.hass.hassapi as hass


class TelegramBot(hass.Hass):

    def initialize(self):
        # Start listening for Telegram updates
        self.listen_event(self.receive_telegram_text, 'telegram_text')

    def receive_telegram_text(self, event_id, payload_event, *args):
      # Do something with the text
      user_id = payload_event['user_id']
      message = payload_event['text']
```

Save the file and the apps should automatically start. The app starts listening to `telegram_text` events; these are triggered when the bot receives a message.

## Saying Hi!

The first feature we can build in to the bot is to say a welcome message. However, it would be kind of annoyaing if the bot said "Hi" every time we send a new message to the bot. To remedy this I only send a greeting message at most once an hour.

Extend the `initialize` function of the class to keep track of your conversations using a dictionary. We will store the last time a user sent a message in this dictionary.

```python
def initialize(self):
    self.time_between_conversations = 60 * 60
    self.last_conversation = {}
```

A new function is added to the class that sends a greeting message. It checks whether the last message was sent longer than 60 minutes and, if so, sends a greeting message.

```python
def greet_user_if_new_conversation(self, user_id, user_name):
    """Say hi when there is a new conversation"""

    # For new users automatically set the time to zero.
    if user_id not in self.last_conversation:
        self.last_conversation[user_id] = 0

    # Compute the time difference in seconds since the last message.
    time_diff = time.time() - self.last_conversation[user_id]

    if time_diff > self.time_between_conversations:
        msg = f"Hi {user_name}"
        # Send a message to the user.
        self.call_service('telegram_bot/send_message',
                          target=user_id,
                          message=msg)

    self.last_conversation[user_id] = time.time()
```

This new function is then called each time we receive a text:

```python
def receive_telegram_text(self, event_id, payload_event, *args):
    self.log(payload_event)
    user_id = payload_event['user_id']
    message = payload_event['text']

    self.greet_user_if_new_conversation(user_id, payload_event['from_first'])
```

The `from_first` payload variable should contain your first name (if set). Saying something to your bot should now result in a simple greeting:

<br><br>

![Simple welcome message from the bot.](/assets/images/ha/telegram_bot_saying_hi.png)

## Asking for the temperature

Now let's do something usefull. I would like to keep track of the current temperature in my house. To facilitate this I created a small function that reports this. However, I only want my bot to tell me the temperature when I ask for it. So we need to do some (very simple) text parsing. I would like the bot to react to simple questions like:

*Is it cold outside?*

*What is the temperature?*

*Is it warm at home?*

This can be done with some ~~very advanced artificial intelligence~~ simple rules in python. The code below matches simple words in the input. *Is it cold outside?* matches due to *cold* and *outside* being present in the text.

```python
if not any((
    'temperature' in message,
    ('warm' in message or 'cold' in message) and ('house' in message or 'inside' in message or 'outside' in message),
    ('warm' in message or 'cold' in message) and ('house' in message or 'inside' in message or 'outside' in message),
)):
  # Report the temperature
  self.send_house_temperature(user_id)
```

If the text message passed any of our rules we then send the temperature back:

```python
def send_house_temperature(self, user_id):
    """Send information about the temperature in the house"""

    sensors = {
        'The outside temperature is {} °C.': 'sensor.temp_1', # Replace this with your sensor's entity id
        'It is {} °C in the livingroom.': 'sensor.temp_2', # Replace this with your sensor's entity id
        'The temperature of the livingroom is {} °C.': 'sensor.temp_2' # Replace this with your sensor's entity id
    }

    start_messages = [
        'Let me see.',
        'These are the temperatures currently.',
        'I have read the sensors for you.'
    ]

    msg = random.choice(start_messages)
    # Read all sensors.
    for template, sensor in sensors.items():
        temp = self.get_state(sensor)
        msg += ' ' + template.format(temp)

    self.call_service('telegram_bot/send_message',
                      target=user_id,
                      message=msg)
```

In this new function I read out different sensors around my home. In this case measuring the outside temperature, and the temperature inside my livingroom and bedroom. A message is then constructed using a randomly chosen start sentence and the sensor readings.

![A conversation with my Home Assistant bot using Telegram.](/assets/images/ha/telegram_bot_temperatures.png)

## Next steps?

This tutorial gave a quick overview of making a Telegram bot, connecting it to Home Assistant and using AppDaemon to send messages. The bot can easily be extended to send other messages or perform certain tasks within Home Assistant. Maybe you want to be able to control your lights using the bot, or activate the robot vacuum cleaner. Any cool ideas? Feel free to add them in the comments!

## Full code (for reference)

```python

import appdaemon.plugins.hass.hassapi as hass

class TelegramBot(hass.Hass):

    def initialize(self):
        # Start listening for Telegram updates
        self.listen_event(self.receive_telegram_text, 'telegram_text')
        
        self.time_between_conversations = 60 * 60
        self.last_conversation = {}

    def receive_telegram_text(self, event_id, payload_event, *args):
      # Do something with the text
      user_id = payload_event['user_id']
      message = payload_event['text']

      # Send greeting message.
      self.greet_user_if_new_conversation(user_id, payload_event['from_first'])

      if not any((
          'temperature' in message,
          ('warm' in message or 'cold' in message) and ('house' in message or 'inside' in message or 'outside' in message),
          ('warm' in message or 'cold' in message) and ('house' in message or 'inside' in message or 'outside' in message),
      )):
        # Report the temperature
        self.send_house_temperature(user_id)

    def greet_user_if_new_conversation(self, user_id, user_name):
        """Say hi when there is a new conversation"""

        # For new users automatically set the time to zero.
        if user_id not in self.last_conversation:
            self.last_conversation[user_id] = 0

        # Compute the time difference in seconds since the last message.
        time_diff = time.time() - self.last_conversation[user_id]

        if time_diff > self.time_between_conversations:
            msg = f"Hi {user_name}"
            # Send a message to the user.
            self.call_service('telegram_bot/send_message',
                              target=user_id,
                              message=msg)

        self.last_conversation[user_id] = time.time()

    def send_house_temperature(self, user_id):
        """Send information about the temperature in the house"""

        sensors = {
            'The outside temperature is {} °C.': 'sensor.temp_1', # Replace this with your sensor's entity id
            'It is {} °C in the livingroom.': 'sensor.temp_2', # Replace this with your sensor's entity id
            'The temperature of the livingroom is {} °C.': 'sensor.temp_2' # Replace this with your sensor's entity id
        }

        start_messages = [
            'Let me see.',
            'These are the temperatures currently.',
            'I have read the sensors for you.'
        ]

        msg = random.choice(start_messages)
        # Read all sensors.
        for template, sensor in sensors.items():
            temp = self.get_state(sensor)
            msg += ' ' + template.format(temp)

        self.call_service('telegram_bot/send_message',
                          target=user_id,
                          message=msg)
```
