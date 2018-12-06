const util = require('./day-5-1.js');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var test = 'dabAcCaCBAcCcaDA';

var count = util.input.length;
var foo = 'a';
var bar = '';

alphabet.forEach((letter)=>{
  let pattern = letter;
  let regex = new RegExp(letter,'ig');
  let clean = util.input.replace(regex,'');
  let polymerized = util.stacking(clean);

  console.log('calculating...');
  console.log(polymerized.length);

  if (polymerized.length < count) {
    count = polymerized.length;
    foo = letter;
    bar = polymerized;
  }

  // console.log(test.replace(regex,''));
  // if (clean.length < count) {
  //   count = test.replace(regex,'').length;
  //   foo = letter;
  //   console.log(test.replace(regex,''));
  // }
})

console.log(bar.length);
console.log(foo);

