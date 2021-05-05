#!/bin/bash

# Enable custom registry here if you need to...
# registry='https://your.npm.registry'

# 1. Perform project-level installation (for testing, linting, etc).
npm install # --registry $registry

# 2. Perform lambda-level installation (for build dependencies).
for lambda in lambda/*;
  do
   if [[ -d $lambda && -f "${lambda}/package.json" ]]; then
    echo $lambda
     npm install --cwd "${lambda}" --prefix "${lambda}" # --registry $registry
   fi
  done;