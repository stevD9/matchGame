var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.

 */

MatchGame.generateCardValues = function () {
  var inOrderCardValues = [];
  var i;
  for (i = 1; i < 9; i++) {
    inOrderCardValues.push(i, i);
  }
  var randomCardValues = [];
  while (inOrderCardValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * inOrderCardValues.length);
    var randomNum = inOrderCardValues[randomIndex];
    randomCardValues.push(randomNum);
    inOrderCardValues.splice(randomIndex, 1);
  }
  return randomCardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
