# PushBullet CLI Client

Send PushBullet notifications to your devices via the command line.

The primary motivation for this project was to allow for an easy way to push notifications in response to system events.
For example: notifying that a download has completed or that a build task has finished.

## Installing

This utility is designed to be light and simple with minimal dependencies and configuration.

First download all dependencies

```
npm install
```

You will then need to obtain your API key from your PushBullet _Account Settings_.

Create a text file `.env` in the root of the project directory with the following:

```
API_KEY=YOURKEY
```

Where `YOURKEY` is the API key you obtained from your PushBullet _Account Settings_.

Done! Ready to roll.

## Usage

### Broadcast a simple note to all devices

```
node pushbullet "This is a test"
```

### Specify a title

You can set a custom title using the `--title` option

```
node pushbullet --title "Test Note" "This is a test"
```

### Push to a device

You can push to a specific device using the `-d` option and mirrors the _node-pushbullet-api_ api:

* If it is a string containing an '@' it is treated as an email address.
* If it is a string not containing an '@' it is treated as a device iden.
* If it is a number it is treated as a device id.
* If it is an object it is assumed to have one of the 'target parameters' as defined on https://docs.pushbullet.com/v2/pushes/ as an attribute. It can also have an optional source_device_iden attribute. If the object is empty, {}, then the push is sent to all devices.

```
node pushbullet -d my-device "This is a test"
```

In addition you may also push to a group of devices:

```
node pushbullet -d [my-device, another-device] "This is a test"
```

## Planned Features

* Specify the notification type with the `-t` option
* Return a list of devices `--devices`
* Update a prior push `-u`
* Return the push history `--history`

## Contributing

This is a utility project written to scratch an itch. It works for my use cases. While i plan to periodically develop it further, never the less this project is not amazingly high on my priority list.

*Pull requests are very welcome* if you wish to contribute features, fixes etc... I only ask that you try to keep your code minimalistic, clean and performance oriented.