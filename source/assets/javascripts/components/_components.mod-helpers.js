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

function setTip(text, container) {
  $(container).text(text);
}
