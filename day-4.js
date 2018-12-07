var readline = require('readline');
var fs = require('fs');

const readInput = async function(filename){
  const interface = readline.createInterface({
    input: fs.createReadStream(filename)
  });

  let input = [];

 return new Promise ((resolve, reject)=>{
    interface.on('line', function (line) {
      input.push(line);
    });
    interface.on('close', ()=>{
      return resolve(input);
    });
  });
};

const getTimeStamp = function (string){
  return string.match(/\[(.*)\]/)[1];
};

const calcMinutes = (a,b) => {
  const firstTime = new Date(a),
    secondTime = new Date(b),
    diff = Math.abs(secondTime.getTime() - firstTime.getTime());

    return (Math.ceil(diff / 1000))/ 60
}


async function app() {
  let input = await readInput('day-4-actual-input.txt');

  input.sort((a, b)=>{
    const _a = parseInt(getTimeStamp(a).replace(/[-:]/g, "").replace(' ','')),
    _b = parseInt(getTimeStamp(b).replace(/[-:]/g, "").replace(' ',''));
    return _a - _b;
  });

  let activeGuard;
  let counts = new Map();
  let minutes = new Map();

  //TODO: make this more generalized
  function setCounts(id, count){
    const currentCount = counts.get(id);

    if (!currentCount) {
      counts.set(id, count);
    } else {
      counts.set(id, currentCount + count);
    }
  }
  let minuteTracker = {

  };

  function setMinutes(id, key, count){
    let currentCount;

    if (!minuteTracker[id]) {
      minuteTracker[id] = new Map();
    } else {
      currentCount = minuteTracker[id].get(key);
    }

    if (!currentCount) {
      minuteTracker[id].set(key, count);
    } else {
      minuteTracker[id].set(key, currentCount + count);
    }
  }

  function highest(map){
    let highest,
    hightestVal = 0;

    for( var val of map){
      if (val[1] > hightestVal) {
        highest = val;
        hightestVal = val[1];
      }
    }

    return highest
  }

  input.forEach((val,index)=>{
    let timeA = getTimeStamp(val),
      timeB,
      id,
      //grab string after # and grabs characters up until the last space using the
      // lazy operator
      idMatch = val.match(/\#(.*?) /),
      minute = parseInt(val.match(/\:(.*)\]/)[1]),
      elapsed;

    if (input[index+1]) {
      timeB = getTimeStamp(input[index+1]);
    }

    // each time the log says the a guard has started duty, set them as the active guard
    if (idMatch) {
      id = idMatch[1];
      activeGuard = id;
    }

    // start counting the minutes when the guard falls asleep
    if (timeB && val.includes('falls asleep')) {
      elapsed = calcMinutes(timeA, timeB);
      setCounts(activeGuard, elapsed);
      for (var i = minute; i < minute+elapsed; i++) {
        setMinutes(activeGuard,i,1);
      }
    }
  });
  //part one
  // const sleepiestGuard= highest(counts)[0];
  // console.log(sleepiestGuard*highest(minuteTracker[sleepiestGuard])[0]);

  //part two
  let sleepiestMinute = 0;
  let laziestGuard;

  Object.keys(minuteTracker).forEach((guard)=>{
    if (highest(minuteTracker[guard])[1] > sleepiestMinute) {
        sleepiestMinute = highest(minuteTracker[guard])[1];
        laziestGuard = guard;
    }
  });
    console.log(sleepiestMinute*laziestGuard);
    console.log(JSON.stringify(minuteTracker));
}
/*
TODO:
- figure out a way to track minutes of each day
*/
app()
.catch((e)=>{
  console.log(e);
  process.exit();
});

