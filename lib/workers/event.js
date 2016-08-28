/* eslint new-cap: [0] */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
/* eslint prefer-reflect: ["error", { "exceptions": ["call"] }]*/
/* eslint-disable func-style, vars-on-top*/

var http = require('http');
var forky = require('forky');
var Eris = require('eris');
var CreateHandler = require('github-webhook-handler');
var config = require('../../config/auth');
var route = require('../route');
var handler = CreateHandler({path: config.web.path, secret: config.github.token});

var githubHandler = function (req, res) {
  handler(req, res, function (err) {
    if (err) {
      console.error(err);
    }
    res.statusCode = 404;
    res.end('no such location');
  });
};

var pingHandler = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Battlecruiser Operational!');
  res.end();
};

var middleware = route.comp([route.wrap(config.web.path, githubHandler), route.wrap('/ping', pingHandler)]);

var server = http.createServer(middleware);

var bot = new Eris(config.discord.token, {
  autoReconnect: true,
  disableEveryone: true,
  messageLimit: 10,
  sequencerWait: 100,
  disableEvents: {
    CHANNEL_CREATE: true,
    CHANNEL_DELETE: true,
    CHANNEL_UPDATE: true,
    GUILD_BAN_ADD: true,
    GUILD_BAN_REMOVE: true,
    GUILD_CREATE: true,
    GUILD_DELETE: true,
    GUILD_MEMBER_ADD: true,
    GUILD_MEMBER_REMOVE: true,
    GUILD_MEMBER_UPDATE: true,
    GUILD_ROLE_CREATE: true,
    GUILD_ROLE_DELETE: true,
    GUILD_ROLE_UPDATE: true,
    GUILD_UPDATE: true,
    MESSAGE_CREATE: true,
    MESSAGE_DELETE: true,
    MESSAGE_DELETE_BULK: true,
    MESSAGE_UPDATE: true,
    PRESENCE_UPDATE: true,
    TYPING_START: true,
    USER_UPDATE: true,
    VOICE_STATE_UPDATE: true}
});

setInterval(function() {
  http.get(config.web.url);
}, 22 * (60 * 1000));

bot.connect().catch(console.error);

bot.on('ready', function () {
  console.log('Connected to Discord');
  server.listen(config.web.port);
  console.log('Webhook server listening on port: ' + config.web.port);
});

bot.on('disconnected', function () {
  console.log('Disconnected from Discord');
});

bot.on('error', function (err) {
if (err) {
  console.log('Error: ${err}\n${err.stack}');
}
});

function createDiscordMessage(repo, text) {
  bot.createMessage(config.discord.channel_id, `**\`${repo}\`**\n ${text}`.substr(0, 2000));
}

handler.on('error', function (err) {
  console.error('Error:', err.message);
});

handler.on('ping', function (data) {
  console.log(`Ping event recieved\n${data.payload.zen}`);
});

handler.on('commit_comment', function (data) {
  createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.comment.user.login}\` **${data.payload.action}** a comment on \`${data.payload.comment.commit_id.substr(0, 7)}\` \`\`\`${data.payload.comment.body.replace(/`/g, '')}\`\`\` `);
});

handler.on('create', function (data) {
  createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **created** \`${data.payload.ref_type} ${data.payload.ref}\``);
});

handler.on('delete', function (data) {
  createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **deleted** \`${data.payload.ref_type} ${data.payload.ref}\``);
});

handler.on('fork', function (data) {
  createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.forkee.owner.login}\` **forked** this repository`);
});

handler.on('gollum', function (data) {
  let sender = [`Wiki updated by \`${data.payload.sender.login}\``];
  data.payload.pages.forEach(p => {
    sender.push(` \`\`\`${p.action} ${p.title.replace(/`/g, '')}\`\`\``);
  });
  createDiscordMessage(data.payload.repository.full_name, sender.join('\n'));
});

handler.on('issue_comment', function (data) {
  createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **${data.payload.action}** a comment on issue \`#${data.payload.issue.number}\`:\`\`\`${data.payload.issue.title.replace(/`/g, '')}\n${data.payload.comment.body.replace(/`/g, '')}\`\`\``);
});

handler.on('issues', function (data) {
  switch (data.payload.action) {
    case 'opened':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.issue.user.login}\` **opened** issue \`#${data.payload.issue.number}\`:\`\`\`${data.payload.issue.title.replace(/`/g, '')}\n${data.payload.issue.body.replace(/`/g, '')}\`\`\``);
      break;
    case 'reopened': {
      let labels = data.payload.issue.labels.map(i => `\`[${i.name}]\``).join(' ');
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **re-opened** issue \`#${data.payload.issue.number}\`:\`\`\`${data.payload.issue.title.replace(/`/g, '')} ${labels}\`\`\``);
      break;
    } case 'closed': {
      let labels = data.payload.issue.labels.map(i => `\`[${i.name}]\``).join(' ');
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **closed** issue \`#${data.payload.issue.number}\`:\`\`\`${data.payload.issue.title.replace(/`/g, '')} ${labels}\`\`\``);
      break;
    } case 'labeled':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **added** label \`[${data.payload.label.name}]\` to issue \`#${data.payload.issue.number}\`:\`\`\`${data.payload.issue.title.replace(/`/g, '')}\`\`\``);
      break;
    case 'unlabeled':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **removed** label \`[${data.payload.label.name}]\` from issue \`#${data.payload.issue.number}\`:\`\`\`${data.payload.issue.title.replace(/`/g, '')}\`\`\``);
      break;
    // no default
  }
});

handler.on('membership', function (data) {
  createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.member.login}\` was **${data.payload.action}** to this repository by \`${data.payload.sender.login}\``);
});

handler.on('pull_request', function (data) {
  switch (data.payload.action) {
    case 'opened':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.pull_request.user.login}\` **opened** pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\n${data.payload.pull_request.body.replace(/`/g, '')}\`\`\``);
      break;
    case 'reopened':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **re-opened** pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\`\`\``);
      break;
    case 'closed':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **${data.payload.pull_request.merged ? 'merged' : 'closed'}** pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\`\`\``);
      break;
    case 'edited':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **edited** pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\n${data.payload.pull_request.body.replace(/`/g, '')}\`\`\``);
      break;
    case 'labeled':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **added** label \`[${data.payload.label.name}]\` to pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\`\`\``);
      break;
    case 'unlabeled':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **removed** label \`[${data.payload.label.name}]\` from pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\`\`\``);
      break;
    case 'syncronize':
      createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.pull_request.user.login}\` **added commits** to pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\`\`\``);
      break;
    // no default
  }
});

handler.on('pull_request_review_comment', function (data) {
  createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` **${data.payload.action}** a comment at line \`${data.payload.comment.position}\` on pull request \`#${data.payload.pull_request.number}\`:\`\`\`${data.payload.pull_request.title.replace(/`/g, '')}\n${data.payload.comment.body.replace(/`/g, '')}\`\`\``);
});

handler.on('push', function (data) {
  if (data.payload.ref.split('/')[1] === 'heads') {
    createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.sender.login}\` pushed **${data.payload.commits.length} commit${data.payload.commits.length === 1 ? '' : 's'}** to \`${data.payload.ref.split('/')[2]}\`\n<${data.payload.repository.html_url}/commit/${data.payload.head_commit.id.substr(0, 7)}>${data.payload.commits.map(c => ` \`\`\`${c.id.substr(0, 7)} - ${c.message.split('\n')[0]}\`\`\` `).join('')}`);
  }
});

handler.on('release', function (data) {
  if (data.payload.release.draft === false) {
    createDiscordMessage(data.payload.repository.full_name, `\`${data.payload.release.author.login}\` **${data.payload.action}** a release from ${data.payload.release.commitish}\nTitle: ${data.payload.release.name || data.payload.release.tag_name}${data.payload.release.body.replace(/`/g, '') ? '\n' + data.payload.release.body.replace(/`/g, '') : ''}`);
  }
});

process.on('uncaughtException', function(err) {
  console.error(err);
  forky.disconnect();
});
