var morseLetters = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--.."
}

var expression = "-- . ... ... .- --. .";

function findLetters(combination) {
  var occurrences = [];
  for (key in morseLetters) {
    var tmp = getIndicesOf(morseLetters[key], combination);
    if (tmp.length > 0) {
      occurrences.push([key, tmp]);
    }
  }
  return occurrences;
}

function getIndicesOf(searchStr, str) {
  var startIndex = 0, searchStrLen = searchStr.length;
  var index, indices = [];
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    var occurrence = index;
    indices.push(occurrence, searchStrLen);
    startIndex = index + searchStrLen;
  }
  return indices;
}

function wrapCharsWithSpan() {
  $('.js-mod-morse-code-input').html(function (i, html) {
    var chars = $.trim(html).split("");
    return '<span class="char">' + chars.join('</span><span class="char">') + '</span>';
  });
}

function applyOccurrences() {
  wrapCharsWithSpan();
  var occurrences = findLetters(expression);
  for (key in occurrences) {
    var current = occurrences[key];
    var t = $("<span class='hint'>"+current[0]+"-"+current[1][1]+"</span>");
    $(".js-mod-morse-code-input .char:eq("+current[1][0]+")").append(t);
  }
  console.log(occurrences);
}

applyOccurrences();

// http://stackoverflow.com/questions/3410464/how-to-find-all-occurrences-of-one-string-in-another-in-javascript
// http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
