/**
 * Calculate Points on Dart Board
 */

var graphOffsets = document.getElementById("canvas").getBoundingClientRect();
var boxOffsets = document.getElementById("box").getBoundingClientRect();

function calcPoints(x, y) {
  console.log('top-left: ' + graphOffsets.left + ' ' + (graphOffsets.top));
  console.log('bot-left: ' + graphOffsets.left + ' ' + (graphOffsets.top + graphOffsets.height + 380));
}
calcPoints(1, 1);