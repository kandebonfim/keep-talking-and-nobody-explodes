function checkForDuplicateValues(arr) {
  var sorted_arr = arr.sort();
  var results = [];
  for (var i = 0; i < arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
          results.push(sorted_arr[i]);
      }
  }
  return results;
}

function setTip(text, container, temporary) {
  temporary = typeof temporary !== 'undefined' ? temporary : false;
  $(container).show();
  $(container).text(text);
  if (temporary) {
    var fadeOutTimeTransition = 300;
    setTimeout(function(){
      $(container).fadeOut(fadeOutTimeTransition);
    }, temporary-fadeOutTimeTransition);
    setTimeout(function(){
      $(container).text('');
    }, temporary);
  };
}
