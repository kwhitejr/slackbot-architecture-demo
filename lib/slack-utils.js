const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const postMessageToChannel = ({
  channel, text, attachments
}) => web.chat.postMessage({
  text,
  attachments,
  channel
});

const postModalToChannel = ({
  trigger_id, view
}) => web.views.open({
  trigger_id,
  view,
});

const updateModalToChannel = ({
  view_id, view
}) => web.views.update({
  view_id,
  view,
});

const isHelp = (text) => !text || text.startsWith('help');

const codeblockFormat = (str) => '\n```\n' + str + '\n```\n';

module.exports = {
  isHelp,
  codeblockFormat,
  postModalToChannel,
  updateModalToChannel,
  postMessageToChannel
}