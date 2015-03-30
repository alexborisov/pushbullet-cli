# PushBullet CLI Client

Send PushBullet notifications to your devices via the command line.

The primary motivation for this project was to allow for an easy way to push notifications in response to system events.
For example: notifying that a download has completed or that a build task has finished.

## BIG FAT DISCLAMER

This code uses features of **ES6** and was developed against the _io.js_ fork of _node.js_.
It will **NOT** work with _node.js_ out of the box unless you specify the `--harmony_iteration` flag.

For more information on _node.js_ and _ES6_ support refer to [Node.js and ES6/Harmony](https://github.com/joyent/node/wiki/ES6-%28a.k.a.-Harmony%29-Features-Implemented-in-V8-and-Available-in-Node)

## Installing

You can either `git clone` this repo or download via _npm_:

```
npm install ab-pushbullet-cli
```

## Setup

This utility is designed to be light and simple with minimal dependencies and configuration.

First download all dependencies

```
npm install
```

You will then need to obtain your API key from your PushBullet _Account Settings_.

Configure _pushbullet-cli_ to use your key

```
node pushbullet --key YOUR_KEY
```

Where `YOUR_KEY` is the API key you obtained from your PushBullet _Account Settings_.

Done! Ready to roll.

**NOTE:** Your key will be stored under your OS _user data_ folder in a file `.pbcli`. Running `--key` again will override this file.

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

### Return a list of devices

```
node pushbullet --devices
```

## Planned Features

* Specify the notification type with the `-t` option
* Update a prior push `-u`
* Return the push history `--history`

## Contributing

This is a utility project written to scratch an itch. It works for my use cases. While I plan to periodically develop it further, this project is not amazingly high on my priority list.

**Pull requests are very welcome** if you wish to contribute features, fixes etc... I only ask that you try to keep your code minimalistic, clean and performance oriented.