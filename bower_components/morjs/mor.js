// [mor.js](http://neocotic.com/mor.js) 1.1.0
//
// (c) 2014 Alasdair Mercer
//
// Freely distributable under the MIT license.
//
// For all details and documentation:
//
// <http://neocotic.com/mor.js>

(function (root) {

  'use strict';

  // Private constants
  // -----------------

  // Pattern placeholder for long marks.
  var LONG = 'L';

  // Pattern placeholder for short marks.
  var SHORT = 'S';

  // Private variables
  // -----------------

  // Save the previous value of the `morjs` variable.
  var previousMorjs = root.morjs;

  // Private functions
  // -----------------

  // Iterator over a given `list` and yield each element in turn to an `iterator` function.
  var each = function(list, iterator) {
    if (!list) {
      return;
    }

    var length = list.length;

    for (var index = 0; index < length; index++) {
      iterator(list[index], index, list);
    }
  };

  // Return the character mapped to the specified `pattern` where possible.
  var getCharacter = function(pattern) {
    pattern = pattern.toLocaleUpperCase();

    var character;

    for (var key in chars) {
      if (chars.hasOwnProperty(key) && chars[key] === pattern) {
        character = key;
        break;
      }
    }


    return character;
  };

  // Return the mode mapping that matches the name provided.
  var getMode = function(name) {
    return modes[name];
  };

  // Return the given `options` with all of the `defaults` applied.
  var getOptions = function(options, defaults) {
    options = options || {};

    for (var key in defaults) {
      if (typeof options[key] === 'undefined') {
        options[key] = defaults[key];
      }
    }

    return options;
  };

  // Return the pattern mapped to the specified `character` where possible.
  var getPattern = function(character) {
    return chars[character.toLocaleUpperCase()];
  };

  // Parse a string by replacing any instances of the queries provided with their corresponding replacement strings.
  var parse = function(str, query1, replacement1, query2, replacement2, spacer) {
    var hasSpacer = typeof spacer === 'string';
    var rQuery    = new RegExp('(' + query1 + '|' + query2 + ')', 'g');
    var result    = '';

    each(str.match(rQuery), function(substr, i) {
      // Insert spacer if provided and not first loop.
      if (hasSpacer && i > 0) {
        result += spacer;
      }

      // Swap queries with their replacements while maintaining new lines.
      if (substr === query1) {
        result += replacement1;
      } else if (substr === query2) {
        result += replacement2;
      }
    });

    return result;
  };

  // Prepare the string to simplify encoding/decoding.
  // The return value is a multi-dimensional array and should be treated as such.
  var prepare = function(str, wordSplitter, letterSplitter, charSplitter) {
    if (typeof str !== 'string') {
      throw new TypeError('Invalid value type: ' + typeof str);
    }

    var hasCharSplitter = typeof charSplitter !== 'undefined';
    var rWordSplitter   = new RegExp(wordSplitter + '|[\\n\\r]+', 'g');
    var result          = str.trim().split(rWordSplitter);

    each(result, function(word, i) {
      result[i] = word = word.split(letterSplitter);

      if (hasCharSplitter) {
        each(word, function(ch, j) {
          result[i][j] = ch.split(charSplitter).join('');
        });
      }
    });

    return result;
  };

  // Repeat a string the specified number of `times`.
  var repeat = function(str, times) {
    if (!str) {
      return str;
    }

    for (var index = 0, result = ''; index < times; index++) {
      result += str;
    }

    return result;
  };

  // Characters
  // ----------

  // Map of Morse code patterns to supported characters.
  var chars = {
  /* Letters                                    */
    '\u0041': 'SL',      /* A                   */
    '\u0042': 'LSSS',    /* B                   */
    '\u0043': 'LSLS',    /* C                   */
    '\u0044': 'LSS',     /* D                   */
    '\u0045': 'S',       /* E                   */
    '\u0046': 'SSLS',    /* F                   */
    '\u0047': 'LLS',     /* G                   */
    '\u0048': 'SSSS',    /* H                   */
    '\u0049': 'SS',      /* I                   */
    '\u004A': 'SLLL',    /* J                   */
    '\u004B': 'LSL',     /* K                   */
    '\u004C': 'SLSS',    /* L                   */
    '\u004D': 'LL',      /* M                   */
    '\u004E': 'LS',      /* N                   */
    '\u004F': 'LLL',     /* O                   */
    '\u0050': 'SLLS',    /* P                   */
    '\u0051': 'LLSL',    /* Q                   */
    '\u0052': 'SLS',     /* R                   */
    '\u0053': 'SSS',     /* S                   */
    '\u0054': 'L',       /* T                   */
    '\u0055': 'SSL',     /* U                   */
    '\u0056': 'SSSL',    /* V                   */
    '\u0057': 'SLL',     /* W                   */
    '\u0058': 'LSSL',    /* X                   */
    '\u0059': 'LSLL',    /* Y                   */
    '\u005A': 'LLSS',    /* Z                   */
  /* Numbers                                    */
    '\u0030': 'LLLLL',   /* 0                   */
    '\u0031': 'SLLLL',   /* 1                   */
    '\u0032': 'SSLLL',   /* 2                   */
    '\u0033': 'SSSLL',   /* 3                   */
    '\u0034': 'SSSSL',   /* 4                   */
    '\u0035': 'SSSSS',   /* 5                   */
    '\u0036': 'LSSSS',   /* 6                   */
    '\u0037': 'LLSSS',   /* 7                   */
    '\u0038': 'LLLSS',   /* 8                   */
    '\u0039': 'LLLLS',   /* 9                   */
  /* Punctuation                                */
    '\u002E': 'SLSLSL',  /* Full stop           */
    '\u002C': 'LLSSLL',  /* Comma               */
    '\u003F': 'SSLLSS',  /* Question mark       */
    '\u0027': 'SLLLLS',  /* Apostrophe          */
    '\u0021': 'LSLSLL',  /* Exclamation mark    */
    '\u002F': 'LSSLS',   /* Slash               */
    '\u0028': 'LSLLS',   /* Left parenthesis    */
    '\u0029': 'LSLLSL',  /* Right parenthesis   */
    '\u0026': 'SLSSS',   /* Ampersand           */
    '\u003A': 'LLLSSS',  /* Colon               */
    '\u003B': 'LSLSLS',  /* Semicolon           */
    '\u003D': 'LSSSL',   /* Equal sign          */
    '\u002B': 'SLSLS',   /* Plus sign           */
    '\u002D': 'LSSSSL',  /* Hyphen-minus        */
    '\u005F': 'SSLLSL',  /* Low line            */
    '\u0022': 'SLSSLS',  /* Quotation mark      */
    '\u0024': 'SSSLSSL', /* Dollar sign         */
    '\u0040': 'SLLSLS',  /* At sign             */
  /* Non-English extensions                     */
    '\u00C4': 'SLSL',    /* A with diaeresis    */
    '\u00C6': 'SLSL',    /* A and E as grapheme */
    '\u0104': 'SLSL',    /* A with ogonek       */
    '\u00C0': 'SLLSL',   /* A with grave        */
    '\u00C5': 'SLLSL',   /* A with ring above   */
    '\u00C7': 'LSLSS',   /* C with cedilla      */
    '\u0108': 'LSLSS',   /* C with circumflex   */
    '\u0106': 'LSLSS',   /* C with acute        */
    '\u0160': 'LLLL',    /* S with caron        */
    '\u00D0': 'SSLLS',   /* Eth                 */
    '\u015A': 'SSSLSSS', /* S with acute        */
    '\u00C8': 'SLSSL',   /* E with grave        */
    '\u0141': 'SLSSL',   /* L with stroke       */
    '\u00C9': 'SSLSS',   /* E with acute        */
    '\u0110': 'SSLSS',   /* D with stroke       */
    '\u0118': 'SSLSS',   /* E with ogonek       */
    '\u011C': 'LLSLS',   /* G with circumflex   */
    '\u0124': 'LLLL',    /* H with circumflex   */
    '\u0134': 'SLLLS',   /* J with circumflex   */
    '\u0179': 'LLSSLS',  /* Z with acute        */
    '\u00D1': 'LLSLL',   /* N with tilde        */
    '\u0143': 'LLSLL',   /* N with acute        */
    '\u00D6': 'LLLS',    /* O with diaeresis    */
    '\u00D8': 'LLLS',    /* O with stroke       */
    '\u00D3': 'LLLS',    /* O with acute        */
    '\u015C': 'SSSLS',   /* S with circumflex   */
    '\u00DE': 'SLLSS',   /* Thorn               */
    '\u00DC': 'SSLL',    /* U with diaeresis    */
    '\u016C': 'SSLL',    /* U with breve        */
    '\u017B': 'LLSSL'    /* Z with dot above    */
  };

  // Modes
  // -----

  // Map of supported modes used to encode/decode messages.
  var modes = {
    // Classic "dot" and "dash" output.
    classic: {
      charSpacer:          '\u0020',     /* Space                   */
      letterSpacer: repeat('\u0020', 3), /* Space (x3)              */
      longString:          '\u002D',     /* Hyphen-minus            */
      shortString:         '\u00B7',     /* Middle dot              */
      wordSpacer:   repeat('\u0020', 7)  /* Space (x7)              */
    },

    // Same as the *classic* mode except outputs xml entities instead of unicode characters.
    classicEntities: {
      charSpacer:          '&nbsp;',     /* Non-breaking space      */
      letterSpacer: repeat('&nbsp;', 3), /* Non-breaking space (x3) */
      longString:          '&#45;',      /* Hyphen-minus            */
      shortString:         '&middot;',   /* Middle dot              */
      wordSpacer:   repeat('&nbsp;', 7)  /* Non-breaking space (x7) */
    },

    // Compact version of the *classic* mode with reduced whitespace.
    compact: {
      charSpacer:          '',           /* <Empty>                 */
      letterSpacer:        '\u0020',     /* Space                   */
      longString:          '\u002D',     /* Hyphen-minus            */
      shortString:         '\u00B7',     /* Middle dot              */
      wordSpacer:   repeat('\u0020', 3)  /* Space (x3)              */
    },

    // Compact version of the *classicEntities* mode with reduced whitespace.
    compactEntities: {
      charSpacer:          '',           /* <Empty>                 */
      letterSpacer:        '&nbsp;',     /* Non-breaking space      */
      longString:          '&#45;',      /* Hyphen-minus            */
      shortString:         '&middot;',   /* Middle dot              */
      wordSpacer:   repeat('&nbsp;', 3)  /* Non-breaking space (x3) */
    },

    // Simple output using a plain hyphen and full stop mixed using a single space to split letters and a new line for
    // words.
    simple: {
      charSpacer:          '',           /* <Empty>                 */
      letterSpacer:        '\u0020',     /* Space                   */
      longString:          '\u002D',     /* Hyphen-minus            */
      shortString:         '\u002E',     /* Full stop               */
      wordSpacer:   repeat('\u0020', 3)  /* Space (x3)              */
    }
  };

  // mor.js setup
  // ------------

  // Build the publicly exposed API.
  var morjs = {

    // Constants
    // ---------

    // Current version of `morjs`.
    VERSION: '1.1.0',

    // Variables
    // ---------

    // Expose the available character mappings.
    chars: chars,

    // Default values to be used if no options are specified or are incomplete.
    defaults: {
      mode: 'compact'
    },

    // Expose the available modes.
    modes: modes,

    // Primary functions
    // -----------------

    // Decode the `message` provided from Morse code to a human-readable message.
    // The message will not be decoded correctly if the mode used to decode the message is not the same as that used to
    // encode it.
    // If the `mode` option is not specified, the default mode will be used.
    decode: function(message, options) {
      message = message || '';
      options = getOptions(options, morjs.defaults);

      var mode   = getMode(options.mode);
      var result = '';
      var value  = prepare(message, mode.wordSpacer, mode.letterSpacer, mode.charSpacer);

      // Ensure message was prepared successfully.
      if (!value) {
        return result;
      }

      // Iterate over each word.
      each(value, function(word, i) {
        // Insert space between each word.
        if (i > 0) {
          result += ' ';
        }

        // Iterate over each character of word.
        each(word, function(ch) {
          var character;
          // Reverse engineer pattern for character.
          var pattern = parse(ch, mode.shortString, SHORT, mode.longString, LONG);

          // Check if pattern is supported.
          if (pattern) {
            // Retrieve first character matching the pattern.
            character = getCharacter(pattern);

            // Append character if it's supported.
            if (typeof character === 'string') {
              result += character;
            }
          }
        });
      });

      return result;
    },

    // Encode the `message` provided in to the Morse code.
    // If the `mode` option is not specified, the default mode will be used.
    encode: function(message, options) {
      message = message || '';
      options = getOptions(options, morjs.defaults);

      var mode   = getMode(options.mode);
      var result = '';
      var value  = prepare(message, '\\s+', '');

      // Ensure message was prepared successfully.
      if (!value) {
        return result;
      }

      // Iterate over each word.
      each(value, function(word, i) {
        // Insert medium gap between each word.
        if (i > 0) {
          result += mode.wordSpacer;
        }

        // Iterate over each character of word
        each(word, function(character, j) {
          // Insert short gap between each letter.
          if (j > 0) {
            result += mode.letterSpacer;
          }

          // Retrieve first character matching the character.
          var pattern = getPattern(character);

          // Parse pattern for character if it's supported.
          if (typeof pattern === 'string') {
            result += parse(pattern, SHORT, mode.shortString, LONG, mode.longString, mode.charSpacer);
          }
        });
      });

      return result;
    },

    // Utility functions
    // -----------------

    // Run mor.js in *noConflict* mode, returning the `morjs` variable to its previous owner.
    // Returns a reference to `morjs`.
    noConflict: function() {
      root.morjs = previousMorjs;

      return this;
    }

  };

  // Export `morjs` for NodeJS and CommonJS.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = morjs;
    }

    exports.morjs = morjs;
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return morjs;
    });
  } else {
    root.morjs = morjs;
  }

})(this);