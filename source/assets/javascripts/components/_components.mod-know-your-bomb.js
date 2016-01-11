var globalData = {
  serial_vogal: true,
  serial_odd: true,
  parallel_port: true,
  battery_number: 0,
}

function updateKnowYourBomb() {
  $('.js-mod-know-your-bomb .js-mod-know-your-bomb-input').each(function(){
    var question = $(this).attr('js-global-question');
    var inputType = $(this).attr('type');
    if (inputType == 'checkbox') {
      globalData[question] = $(this).is(':checked');
    } else if (inputType == 'number') {
      globalData[question] = parseInt($(this).val());
    }
  });
  // console.log(globalData);
}

$('.js-mod-know-your-bomb .js-mod-know-your-bomb-input').click(function(event) {
  updateKnowYourBomb();
}).keyup(function(event) {
  updateKnowYourBomb();
});;

updateKnowYourBomb();
