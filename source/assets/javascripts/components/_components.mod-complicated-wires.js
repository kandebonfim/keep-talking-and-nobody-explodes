var vennIntersections = {
  led: [8, 9, 10, 11, 12, 13, 14, 15],
  star: [4, 5, 6, 7, 12, 13, 14, 15],
  blue: [2, 3, 6, 7, 10, 11, 14, 15],
  red: [1, 3, 5, 7, 9, 11, 13, 15]
}

function compWiresAddAttributesToSvg() {
  for (var key in vennIntersections) {
      var intersections = vennIntersections[key];

      for (var i = 0; i < intersections.length; i++) {
        $('.js-intersection[js-data-int="'+intersections[i]+'"]').attr(key, '');
      };
  }
}

function compWiresQuestionReorder() {
  $('.js-mod-comp-wires .js-mod-comp-wires-question').each(function(){
    if ($(this).find('.js-small-switcher-active').attr('answer') == 'y') {
      $(this).prependTo($('.js-mod-comp-wires-questions-container'));
    };
  })
}

function compWiresAddAnswerToVisualization() {
  $('.js-mod-comp-wires .js-mod-comp-wires-question-getter').each(function(){
    var currentQuestion = $(this).attr('question');
    var currentAnswer = $(this).children('.js-small-switcher-active').attr('answer');
    if (currentAnswer == 'y') {
      $('.js-intersection['+currentQuestion+']').attr('active', '')
    } else if (currentAnswer == 'n') {
      $('.js-intersection['+currentQuestion+']').removeAttr('active')
    }
  });
}

$('.js-mod-comp-wires .js-mod-comp-wires-option').click(function(){
  $(this).siblings().removeClass('js-small-switcher-active');
  $(this).addClass('js-small-switcher-active');
  compWiresQuestionReorder();
  compWiresAddAnswerToVisualization();
})

setTimeout(function(){
  compWiresAddAttributesToSvg();
}, 500);
