function solveWires(wires) {
  var wiresLength = wires.length;
  switch (wiresLength) {

    // 3 wires
    case 3:

      // If there are no red wires, cut the second wire.
      if (wires.indexOf('red') == -1){
        return 'Cut the second wire!';
      }

      // If the last wire is white, cut the last wire.
      else if (wires[wiresLength-1] == 'white'){
        return 'Cut the last wire!';
      }

      // if there is more than one blue wire, cut the last blue wire.
      else if (checkForDuplicateValues(wires).length > 0 &&
               checkForDuplicateValues(wires).indexOf('blue') > -1){
        return 'Cut the last blue wire!';
      }

      // Otherwise...
      else {
        return "Cut the last wire!";
      }

      break;

    // 4 wires
    case 4:

      console.log('4!');

      // If there is more than one red wire and the last digit of the serial number is odd, cut the last red wire.
      if (checkForDuplicateValues(wires).length > 0 &&
          checkForDuplicateValues(wires).indexOf('red') > -1 &&
          lastDigitOfSerialNumber % 2 == 1){
        return 'Cut the last red wire 1';
      }

      // If the last wire is yellow and there are no red wires, cut the first wire.
      else if (wires[wiresLength-1] == 'yellow' &&
               wires.indexOf('red') == -1) {
        return 'Cut the first wire 2';
      }

      // If there is exactly one blue wire, cut the first wire.
      else if (wires.indexOf('blue') > -1 &&
               checkForDuplicateValues(wires).indexOf('blue')) {
        return 'Cut the first wire! 3';
      }

      // If there is more than one yellow wire, cut the last wire.
      else if (checkForDuplicateValues(wires).indexOf('yellow') > -1) {
        return 'Cut the last wire! 4';
      }

      // Otherwise...
      else {
        return 'Cut the second wire 5';
      }

      break;
    case 5:
      break;
    case 6:
      break;
  }
}
