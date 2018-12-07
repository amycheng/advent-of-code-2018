'use strict';

const utils = require('./utils');

async function app(){
  const input = await utils.readInput('day-7-1-input.txt');
  let deps = new Map();
  let steps = new Set();

  input.forEach((val)=>{
    var parsed = val.split(' ');
    console.log(parsed[1]);
    console.log(parsed[7])
    if (!deps.get(parsed[7])) {
      deps.set(parsed[7],[parsed[1]]);
    } else {
      deps.get(parsed[7]).push(parsed[1]);
      // deps.set(parsed[7],foo);
    }
  });

      console.log(deps);
}

app();
