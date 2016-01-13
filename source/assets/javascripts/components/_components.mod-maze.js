var mazes = {
  x1y2: 0,
  x6y3: 0,
  x5y2: 1,
  x2y4: 1,
  x6y4: 2,
  x4y4: 2,
  x1y1: 3,
  x1y4: 3,
  x5y3: 4,
  x6y6: 4,
  x5y1: 5,
  x3y5: 5,
  x2y1: 6,
  x2y6: 6,
  x4y1: 7,
  x3y4: 7,
  x1y5: 8,
  x3y2: 8
}

function solveMaze() {
  var currentArea = $('.js-maze .js-maze-area.js-maze-area-active');
  var x = $(currentArea).attr('x');
  var y = $(currentArea).attr('y');
  var currentMaze = mazes['x'+x+'y'+y];
  $('.js-maze-index-'+currentMaze).addClass('js-maze-active');
  // console.log(currentMaze);
}

$('.js-maze .js-maze-area').click(function(){
  $(this).addClass('js-maze-area-active');
  solveMaze();
})
