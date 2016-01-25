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
  x4y6: 4,
  x5y1: 5,
  x3y5: 5,
  x2y1: 6,
  x2y6: 6,
  x4y1: 7,
  x3y4: 7,
  x1y5: 8,
  x3y2: 8
}

var mazeStage = 1;

function findMaze(el) {
  var currentArea = $(el);
  var area = $(currentArea).attr('area');
  var currentMaze = mazes[area];
  if (currentMaze) {
    findMazeAreasForMaze(currentMaze);
    $('.js-maze-index-'+currentMaze).addClass('js-maze-active');
    mazeStage = 2;
  } else {
    setTip('There is no maze with green area in that position.', '.js-mod-maze-tips', 2000)
  }
}

function findMazeAreasForMaze(currentMaze) {
  var activeAreas = [];
  for (var key in mazes) {
    if (mazes[key] == currentMaze) {
      activeAreas.push(key);
    }
  }
  $('.js-maze-area[area="'+activeAreas[0]+'"]').addClass('js-maze-area-active');
  $('.js-maze-area[area="'+activeAreas[1]+'"]').addClass('js-maze-area-active');
  $('.js-maze .js-maze-map-container').addClass('js-maze-map-found');
}

function setUserLocation(el) {
  $(el).addClass('js-maze-user-active');
  mazeStage = 3;
}

function setTargetLocation(el) {
  $(el).addClass('js-maze-target-active');
  mazeStage = 4;
}

function setMazeOnboarding() {
  var message = '';
  switch(mazeStage){
    case 1:
      message = "Select the green circles on the map";
      break;
    case 2:
      message = "Select the square position";
      break;
    case 3:
      message = "Select the triangle position";
      break;
    case 4:
      message = "Tell the directions for your partner";
      break;
  }
  $('.js-maze-hero').text(message);
}

function clearMaze() {
  $('.js-maze-area-active').removeClass('js-maze-area-active');
  $('.js-maze-map').removeClass('js-maze-active');
  $('.js-maze-user-active').removeClass('js-maze-user-active');
  $('.js-maze-target-active').removeClass('js-maze-target-active');
  mazeStage = 1;
}

$('.js-maze .js-maze-area').click(function(){
  switch(mazeStage){
    case 1:
      findMaze(this);
      break;
    case 2:
      setUserLocation(this);
      break;
    case 3:
      setTargetLocation(this);
      break;
  }
  setMazeOnboarding();
})
