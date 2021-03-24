const AWS = require('aws-sdk');
const queryString = require('query-string');

const handler = async (event) => {
  try {
    const body = getBodyFromQueryString(event);
    const lambda = new AWS.Lambda();

    return lambda.invokeAsync(makeInvocationParams(body))
      .promise()
      .then(() => ({ statusCode: 200, body: 'Ok! Working on it, boss.' }))
      .catch((err) => ({ statusCode: 200, body: `An error occurred: ${err.message}.` }));
  } catch (err) {
    throw new Error(err);
  }
};

const makeInvocationParams = (body) => {
  const InvokeArgs = JSON.stringify(body);
  const { command } = body;
  switch (command) {
    case '/foobar': 
      return {
        FunctionName: 'handle-foobar-command-worker',
        InvokeArgs
      };
    case '/quiz': 
      return {
        FunctionName: 'handle-quiz-command-worker',
        InvokeArgs
      };
    default:
      throw new Error(`Slack command not recognized: ${command}.`);
  }
};

const getBodyFromQueryString = (event) => {
  let body = {};

  try {
    if (event.body && isJsonString(event.body)) {
      body = JSON.parse(event.body);
    } else {
      body = queryString.parse(event.body);
    }
  } catch (err) {
    console.log('Cannot parse as Query String. trying JSON');
  }
  return body;
};

const isJsonString = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  handler,
  getBodyFromQueryString,
  isJsonString
};
