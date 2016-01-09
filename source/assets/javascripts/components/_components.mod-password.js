function solvePasswords() {
  $(".js-mod-passwords .js-mod-passwords-word").each(function() {
    wordOfInput = $(this).attr('js-data-word');
    arrayOfWordInput = wordOfInput.split('');
    compareArray = [];
    for (var i = 0; i < arrayOfWordInput.length; i++) {
      compareArray.push(compareWithInput(arrayOfWordInput[i], i));
    };

    if (compareArray.indexOf('found') > -1 &&
        compareArray.indexOf('not-found') == -1) {
      $(this).removeClass('js-word-inactive');
      $(this).addClass('js-word-active');
    } else {
      $(this).removeClass('js-word-active');
      $(this).addClass('js-word-inactive');
    }
  });
}

function compareWithInput(char, inputIndex) {
  var currentInputValArray = $('.js-mod-passwords .js-mod-passwords-input:eq('+inputIndex+')').val().split('');
  if (currentInputValArray.length == 0) {
    var result = 'empty'
  } else if (currentInputValArray.indexOf(char) > -1) {
    var result = 'found'
  } else {
    var result = 'not-found'
  }
  return result;
}

function clearPasswords() {
  $('.js-mod-passwords .js-mod-passwords-input').val('');
}

$('.js-mod-passwords .js-mod-passwords-input').keyup(function(){
  solvePasswords();
});
