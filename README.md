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
`discord-bot-github` is an open source bot for sending GitHub Webhooks to Discord.
You can then relay this information by binding it to a specific channel. We are tailoring this bot to output messages in a more clean fashion.

## Installation
1. `npm install`
2. `node bot.js`
3. Remember to create a webhook and set the Payload URL to `http://YOURIP:8080/webhook` with `application/json`

## Documentation
### Pre-requisites for Project
	1. eris
	2. forky
	3. github-webhook-handler
	4. http
	5. eslint
	6. foreman
### Configuration `(config/auth.js)`
Configuration | Description
----------------|--------------
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
