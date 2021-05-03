const { isHelp, postMessageToChannel } = require('./project-lib/slack-utils')
const { helpText } = require('./help-text')

const handler = async (event) => {
  const { channel_id: channelId, text } = event;
  
  if (isHelp(text)) postMessageToChannel({
    channel: channelId,
    text: helpText
  })

  const response = `The text you foobarred was \"${text}\".`

  return await postMessageToChannel({ 
    channel: channelId,
    text: response
  })
};

module.exports = {
  handler
}