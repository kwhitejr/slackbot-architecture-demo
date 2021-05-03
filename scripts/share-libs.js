#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const exportDir = process.argv[2] || 'lambda';

const workerLambdas = ['handle-foobar-command-worker', 'handle-quiz-command-worker'];
const controllerLambdas = ['slack-command-controller', 'slack-interaction-controller'];
const allLambdas = [].concat(workerLambdas, controllerLambdas);

const config = {
  'slack-utils.js': workerLambdas
};

Object.keys(config).forEach((libName) => {
  const lambdas = config[libName];
  lambdas.forEach((lambda) => {
    const dir = path.join(exportDir, lambda, 'src/project-lib');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const [libDir, libFile] = libName.split('/');
    if (libDir && libFile) {
      if (!fs.existsSync(`${dir}/${libDir}`)) {
        fs.mkdirSync(`${dir}/${libDir}`);
      }
    }

    fs.copyFileSync(path.join('./lib', libName), path.join(dir, fileName));
  });
});
