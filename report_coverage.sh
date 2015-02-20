#!/bin/sh

NODE=$(node -v)

if [[ "${NODE%"${NODE#?????}"}" == "v0.10" ]]
then
    mocha -r blanket -R mocha-lcov-reporter test | ./node_modules/coveralls/bin/coveralls.js
fi