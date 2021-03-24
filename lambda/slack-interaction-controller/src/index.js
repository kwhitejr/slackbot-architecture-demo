const AWS = require('aws-sdk'); 

const handler = async (event) => {
  try {
    const payload = getInteractionResponse(event);
    console.log(JSON.stringify(payload));
    const lambda = new AWS.Lambda();

    return lambda.invokeAsync(makeInvocationParams(payload))
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
