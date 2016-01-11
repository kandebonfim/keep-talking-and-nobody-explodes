var vennIntersections = {
  led: [8, 9, 10, 11, 12, 13, 14, 15],
  star: [4, 5, 6, 7, 12, 13, 14, 15],
  blue: [2, 3, 6, 7, 10, 11, 14, 15],
  red: [1, 3, 5, 7, 9, 11, 13, 15]
}

function addClassesToSvg() {
  for (var key in vennIntersections) {
      var intersections = vennIntersections[key];

      for (var i = 0; i < intersections.length; i++) {
        $('.js-intersection[js-data-int="'+intersections[i]+'"]').attr(key, '');
      };
  }
}

function addAnswerToVisualization(trigger) {
  var currentQuestion = $(trigger).parents('.js-mod-comp-wires-question-getter').attr('question');
  var currentAnswer = $(trigger).attr('answer');
  $(trigger).siblings().removeClass('js-small-switcher-active');
  $(trigger).addClass('js-small-switcher-active');
  if (currentAnswer == 'y') {
    $('.js-intersection['+currentQuestion+']').attr('active', '')
  } else {
    $('.js-intersection['+currentQuestion+']').removeAttr('active')
  }
  console.log(currentQuestion);
}

$('.js-mod-comp-wires .js-mod-comp-wires-option').click(function(){
  addAnswerToVisualization(this);
})

setTimeout(function(){
  addClassesToSvg();
}, 500);
