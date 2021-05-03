const querystring = require('querystring');
const { isHelp, postMessageToChannel, codeblockFormat } = require('./project-lib/slack-utils')
const { helpText } = require('./help-text')

const handler = async (event) => {
  const { channel_id: channelId, text, trigger_id } = event;
  
  if (isHelp(text)) postMessageToChannel({
    channel: channelId,
    text: helpText
  })
  
  const { name, type: interactionType } = querystring.decode(text);

  try {
    switch (interactionType) {
      case 'message':
        const quiz = 'Who is the fairest of them all?';
        const attachment = makeQuizAttachment(name);
        return await postMessageToChannel({
          channel: channelId,
          text: quiz,
          attachment
        })
      case 'modal': 
        // 1. Send empty modal immediately (before trigger_id expires), then do work
        const emptyModal = await postModalToChat({ trigger_id, view: makeEmptyModal() });
        
        // 2. Do work...
        
        // 3. Construct actual quiz modal
        const modal = makeQuizModal(name);

        // 3. Send actual quiz modal
        return await updateModalToChat({ view_id: emptyModal.view.id, view: modal });
      case 'home':
        // implement me!
        return undefined;
      default: 
        return await postMessageToChannel({ channel: channelId, text: `Unknown type: ${interactionType}` });
    }
  } catch (err) {
    const errMessage = 'Something went horribly wrong: ' + codeblockFormat(err.stack)
    return await postMessageToChannel({ channel: channelId, text: errMessage });
  }
};

module.exports = {
  handler
}