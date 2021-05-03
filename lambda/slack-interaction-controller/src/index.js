const AWS = require('aws-sdk'); 

const handler = async (event) => {
  try {
    const payload = getInteractionResponse(event);
    const lambda = new AWS.Lambda();
    const invocationParams = makeInvocationParams(payload);

    return lambda.invokeAsync(invocationParams)
      .promise()
      .then(() => ({ statusCode: 204 }))
      .catch((err) => ({ statusCode: 200, body: `An error occurred: ${err.message}.` }));
  } catch (err) {
    throw new Error(err);
  }
};

const makeInvocationParams = (payload) => {
  const InvokeArgs = JSON.stringify(payload);
  return {
    FunctionName: 'handle-quiz-interaction-worker',
    InvokeArgs
  };
};

const getInteractionResponse = (event) => {
  const { body } = event;
  let payload;
  try {
    payload = JSON.parse(decodeURIComponent(body.slice(8))); // remove prepended `payload=`, decode, and parse
  } catch (err) {
    throw new Error(`Could not parse body: ${err}`);
  }
  return payload;
};

module.exports = {
  handler,
  getInteractionResponse
};
