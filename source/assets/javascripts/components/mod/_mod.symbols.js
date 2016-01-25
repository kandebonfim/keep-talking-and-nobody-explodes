function solveSymbols() {
  $('.js-mod-symbols .js-mod-symbols-column').each(function(){
    var activeSymbolsOnColumn = $(this).children('.js-symbol-active');
    if (activeSymbolsOnColumn.length >= 4) {
      $(this).addClass('js-selected-column');
    };
  });
}

function clearSymbols() {
  $(".js-mod-symbols .js-symbol").removeClass('js-symbol-active');
  $('.js-mod-symbols .js-mod-symbols-column').removeClass('js-selected-column');
}

$(".js-mod-symbols .js-symbol").click(function() {
  var symbol = $(this).attr('js-symbol')
  $(".js-symbol[js-symbol="+symbol+"]").toggleClass('js-symbol-active');
  solveSymbols();
});
