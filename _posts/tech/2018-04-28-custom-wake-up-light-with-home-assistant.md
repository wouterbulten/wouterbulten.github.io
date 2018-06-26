---
layout: post
title:  "Room wake-up light: Custom room-wide wake-up light using Home Assistant"
date:   2018-04-27 17:26
categories: blog tech
tags: [home automation, home assistant, wake-up, automations]
published: true
description: "In this post I will show you how to build a custom wake-up light system. The automation will be configurable (on/off, time) and has a switch to disable it on weekends."
---

Recently I started using [Home Assistant (HA)](https://www.home-assistant.io/) as a tool to control the lights in my home. My previous system was based on Homekit and, while working fairly good, lacked tools to further customize the automations. To get more control I switched to HA.

One of the first things I created using HA was a **room wake-up light**. I do own a Philips wake-up light but this doesn't light up my whole room so that left room fore improvement. The automation I built using Home Assistant slowly lights my room every morning. The system works with any smart lamp that is compatible with HA, this includes Philips Hue and IKEA Tradfri lamps.

In this post I'll show you how to build this system. The automation will be configurable (on/off, time) and has a switch to disable it on weekends.

![Dashboard widget of the Wake-up light component. All functions are configurable through the Home Assistant dashboard.](/assets/images/ha/ha-wake-up-lights.png)

## Time sensor

First step is to add a new sensor that measures time. This sensor will trigger the automation at the correct time. Add the following to `sensors.yaml`:

```yaml
# sensors.yaml
- platform: time_date
  display_options:
    - 'time'
```

Make sure that this file is included in your `configuration.yaml` file, if not add the following:

```yaml
# configuration.yaml
sensor: !include sensors.yaml
```

## Create dashboard widget

Next we build the dashboard widget. The widget consists of three controls: (1) a time input to control when the lights should go on, (2) an on/off switch and (3) a switch to enable the system on weekends.

We start with the two switches which are implemented as an `input_boolean`. Add the following to `configuration.yaml`:

```yaml
# configuration.yaml
input_boolean :
  wakeup_enabled:
    name: "Wake-up lights"
    initial: on
    icon: mdi:theme-light-dark
  wakeup_weekend:
    name: "Enable Wake-up on weekends"
    initial: off # I disable the system on default on weekends
    icon: mdi:calendar-blank
```

The icons can be customized, see [Material Design Icons](https://materialdesignicons.com/) for more options.

The third input controls the time of the wakeup light. For this we use `input_datetime` with the date component disabled as we are only interested in time.

```yaml
# configuration.yaml
input_datetime:
  wakeup_time:
    name: "Start lights at"
    has_time: true
    has_date: false
    initial: "07:20"
```

To group the controls together in a single card on the dasboard we need to make a new group. Add the following to the `groups.yaml` file. Again make sure that this file is included in `configuration.yaml`.

```yaml
# groups.yaml
alarm_clock:
  name: "Wake-up Lights"
  entities: # Add all entities here that should be part of the widget
    - input_datetime.wakeup_time
    - input_boolean.wakeup_enabled
    - input_boolean.wakeup_weekend
```

## Create the automation

With all controls defined we can make the automation itself. The automation consists of three components: the trigger, the condition and the action. Add the following to `automations.yaml`:

```yaml
{% raw %}
# automations.yaml
- alias: "Wake-me up using bedroom lights"
  trigger:
    # Something that triggers the automation
  condition:
    # A list of conditions that need to be met
  action:
    # The action we want to perform.
{% endraw %}
```

The trigger is based on the time sensor we just created. It gets the state of the sensor and checks whether this value matches the value of our datetime input.

```yaml
{% raw %}
trigger:
  platform: template
  value_template: "{{ states('sensor.time') == (states.input_datetime.wakeup_time.attributes.timestamp | int | timestamp_custom('%H:%M', False)) }}"
{% endraw %}
```

The trigger we defined above will fire regardless of the on/off switches. To include the switches in the automation we have to create a list of conditions. The first condition checks whether the wake-up light is enabled, if not the automation is not executed at all. Then we add an `or` condition that checks whether it is a weekday (a condition on time) or that the weekend switch is enabled. Only one of the `or` conditions has to be met.

```yaml
{% raw %}
condition:
  - condition: state
    entity_id: input_boolean.wakeup_enabled
    state: 'on'
  - condition: or # One of the conditions below must be true
    conditions:
      - condition: state # Will be true when the switch is 'on'
        entity_id: input_boolean.wakeup_weekend
        state: 'on'
      - condition: time # Will be true on weekdays
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
{% endraw %}
```

Last we define what to do when all conditions are met. In my case I slowly fade in all the lights in the `group.bedroom` group. You can add your own lights here.

```yaml
{% raw %}
action:
  - service: light.turn_on
    entity_id: group.bedroom # Put the entity of your light or your group here
    data:
      transition: 600 # Transition time in seconds
      brightness: 255
{% endraw %}
```

The full automation with everything filled in, this should be placed in `automations.yaml`.

```yaml
{% raw %}
# automations.yaml
- alias: "Wake me up with bedroom light transition for weekdays"
  trigger:
    platform: template
    value_template: "{{ states('sensor.time') == (states.input_datetime.wakeup_time.attributes.timestamp | int | timestamp_custom('%H:%M', False)) }}"
  condition:
    - condition: state
      entity_id: input_boolean.wakeup_enabled
      state: 'on'
    - condition: or
      conditions:
        - condition: state
          entity_id: input_boolean.wakeup_weekend
          state: 'on'
        - condition: time
          weekday:
            - mon
            - tue
            - wed
            - thu
            - fri
  action:
    - service: light.turn_on
      entity_id: group.bedroom
      data:
        transition: 600
        brightness: 255
{% endraw %}
```

## Enable the automation

With everything filled in restart HA. The widget should be available on your dashboard. From there you can enable the widget and set a custom time. Your lights should now go on at the defined time 💡.
