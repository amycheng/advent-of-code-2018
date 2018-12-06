var test = [
[1, 1],
[1, 6],
[8, 3],
[3, 4],
[5, 5],
[8, 9]
];

var input = [
[156, 193],
[81, 315],
[50, 197],
[84, 234],
[124, 162],
[339, 345],
[259, 146],
[240, 350],
[97, 310],
[202, 119],
[188, 331],
[199, 211],
[117, 348],
[350, 169],
[131, 355],
[71, 107],
[214, 232],
[312, 282],
[131, 108],
[224, 103],
[83, 122],
[352, 142],
[208, 203],
[319, 217],
[224, 207],
[327, 174],
[89, 332],
[254, 181],
[113, 117],
[120, 161],
[322, 43],
[115, 226],
[324, 222],
[151, 240],
[248, 184],
[207, 136],
[41, 169],
[63, 78],
[286, 43],
[84, 222],
[81, 167],
[128, 192],
[127, 346],
[213, 102],
[313, 319],
[207, 134],
[154, 253],
[50, 313],
[160, 330],
[332, 163]
];


function calcBounds (input) {
let highestX = 0;
let highestY = 0;
for ( var coord of input) {
  var x = coord[0],
  y = coord[1];

  if (x > highestX) {
    highestX = x;
  }
  if (y > highestY) {
    highestY = y;
  }
}
return [highestX,highestY];
}

// copied pasta'd from https://github.com/semibran/manhattan
function getManhattanDistance(a,b){
  var distance = 0
  var dimensions = Math.max(a.length, b.length)
  for (var i = 0; i < dimensions; i++) {
    distance += Math.abs((b[i] || 0) - (a[i] || 0))
  }
  return distance
}

function createMap(input){
  let grid = new Map();
  const bounds = calcBounds(input);
  let interator=0;
  for (var i = bounds[0] - 1; i >= 0; i--) {
    for (var j = bounds[1] - 1; j >= 0; j--) {
      var coordinates = `${i},${j}`;
      var shortestDist = 0;
      var winner="";
      //NOTE: iterating backwards is faster than incrementing
      for (var k = input.length - 1; k >= 0; k--) {
        var dist = getManhattanDistance(input[k], [i,j]);
        var point = `[${input[k][0]},${input[k][1]}]`;
        if (k === input.length-1) {
          shortestDist = dist;
          winner = point;
        } else {
          if (dist < shortestDist) {
            shortestDist = dist;
            winner = point;
          }

          if (dist === shortestDist && winner !== point) {
            winner = winner + ',' + point;
          }
        }
       } //END FOR LOOP

       grid[coordinates]=winner;

    }
  }
  //WARNING: large json objects hog memory
  console.log(grid);
  return grid;
}



createMap(input);

// TODO: knock out any infinite coordinates, those that are alone along the edge
