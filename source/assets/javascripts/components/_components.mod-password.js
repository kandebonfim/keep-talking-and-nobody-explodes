function solvePassword() {
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
    console.log(compareArray);
  });
}

function compareWithInput(char, inputIndex) {
  var currentInputValArray = $('.js-mod-passwords .js-mod-passwords-input:eq('+inputIndex+')').val().split('');
  if (currentInputValArray.length == 0) {
    var result = 'empty'
    // console.log('input '+inputIndex+' vazio');
  } else if (currentInputValArray.indexOf(char) > -1) {
    var result = 'found'
    // console.log("char "+char+" encontrado no input "+inputIndex);
  } else {
    var result = 'not-found'
    // console.log("char "+char+" não encontrado no input "+inputIndex);
  }
  return result;
}

$('.js-mod-passwords .js-mod-passwords-input').keyup(function(){
  solvePassword();
});
