[![POGODEV](https://github.com/pogodevorg/assets/blob/master/public/img/logo-github.png?raw=true)](https://pogodev.org)

# discord-bot-github
[![Build Status](https://travis-ci.org/pogodevorg/discord-bot-github.svg?branch=master)](https://travis-ci.org/pogodevorg/discord-bot-github) [![Code Climate](https://codeclimate.com/github/pogodevorg/discord-bot-github/badges/gpa.svg)](https://codeclimate.com/github/pogodevorg/discord-bot-github) [![Issue Count](https://codeclimate.com/github/pogodevorg/discord-bot-github/badges/issue_count.svg)](https://codeclimate.com/github/pogodevorg/discord-bot-github) [![license](https://img.shields.io/github/license/pogodevorg/discord-bot-github.svg?maxAge=2592000?style=flat-square)](https://github.com/pogodevorg/discord-bot-github/blob/master/LICENSE.md)

## Table of Contents

* [What is it?](#what-is-it)
* [Installation](#installation)
* [Documentation](#documentation)
* [Contributing](#contributing)
  * [Core Maintainers](#core-maintainers)
* [Licensing](#licensing)
  * [Third Party Licenses](#third-party-licenses)
* [Credits](#credits)

## What is it?
`discord-bot-github` is an open source bot for sending GitHub Webhooks to Discord by binding messages to a specific channel.

## Installation
1. `npm install`
2. Rename `config/auth.js.example` to `config/auth.js`
3. Configure `config/auth.js`
4. `node bot.js`
5. Remember to create a webhook and set the Payload URL to `http://YOURIP:8080/webhook` with `application/json`

Having issues or just have a good idea? Please submit an [issue](https://github.com/pogodevorg/discord-bot-github/issues/new).

## Documentation
### Pre-requisites for Project
	1. eris
	2. forky
	3. github-webhook-handler
	4. http
	5. eslint
	6. foreman
	7. semver
### GitHub Webhook
Want to learn more about [GitHub Webhooks](https://developer.github.com/webhooks/) and it's event handlers?
You can also check out the [GitHub API Status](https://status.github.com/).
### Eris, a NodeJS Wrapper for Discord
[Eris](https://github.com/abalabahaha/eris), NodeJS Discord Library, is speedy, consistent, flexible, predictable, and a simple command framework.
You can find out more about the library usage by going to their [Documentation](https://abal.moe/Eris/docs.html)
### Configuration `(config/auth.js)`
Configuration | Description
----------------|--------------
`config.googl` | This is used for URL shortening, if you wish to keep default Github links, use an invalid key as the key or keep it blank.
`config.discord.token` | Discord Bot Token. You can find out more [here](https://discordapp.com/developers/docs/topics/oauth2#bots).
`config.discord.channelID` | Input the Discord channel ID that you want to bind the bot to.
`config.github.token` | Input the GitHub Webhook Secret/Token that you created.
`config.github.logspath` | Input the absolute path to the folder you wish to save the logs into.
`config.web.cname` | Don't Touch Me Please. Only if you have to.
`config.web.url` | Don't Touch Me Please. Only if you have to.
`config.web.workers` | Don't Touch Me Please. Only if you have to.
`config.web.path` | Don't Touch Me Please. Only if you have to.

## Licensing
[GNU GPL](https://github.com/pogodevorg/discord-bot-github/blob/master/LICENSE) v3.

### Third Party Licenses
    None

## Contributing
Currently, you can contribute to this project by:
* Submitting a detailed [issue](https://github.com/pogodevorg/discord-bot-github/issues/new).
* [Forking the project](https://github.com/pogodevorg/discord-bot-github/fork), and sending a pull request back to for review.

### Core Maintainers

* [![Build Status](https://github.com/fkndean.png?size=36) - fkndean](https://github.com/fkndean)

* [![Build Status](https://github.com/Lisiano256.png?size=36) - Lisiano256](https://github.com/Lisiano256)

## Credits
1. github-webhook-handler
 * GitHub Webhook Library or "middleware" handles all the logic of receiving and verifying webhook requests from GitHub
2. eris
 * NodeJS Discord Wrapper
3. nandub
 * Base Code
