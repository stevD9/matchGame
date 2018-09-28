// BUGS

/*
There is a bug on mobile where when you click on the card the
numbers get selected (selector cursor for text?). fix.
*/

// FEATURES

/*
1. When the user wins, animate a screen coming forward
with the text "You are a mothaerfucking mathematical
genius!!" if within time, or if they took long ridicule
them and add also a song (playback).
--DONE-- 2. when two unflipped cards remain, play brahms
zaratustra. --DONE --
*/

// CODE

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

/*
  Generates and returns an array of matching card values.

 */

var MatchGame = {};

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
  $game.data('flippedCards', []);
  // array for storing flipped correct cards
  $game.data('cardsLeft', []);
  // array for triggering Zarathustra
  $game.data('trigger', []);

  var cardColors = ['hsl(23,85%,65%)', 'hsl(55,85%,65%)', 'hsl(90,85%,65%)',
  'hsl(160,85%,65%)', 'hsl(220,85%,65%)', 'hsl(265,85%,65%)', 'hsl(310,85%,65%)', 'hsl(360,85%,65%)'];
  $game.empty();
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', cardColors[$card.data('value')-1]);
    $game.append($card);
  }
  $('.card').click(function(){
    (MatchGame.flipCard($(this), $('#game')));
  });
};

// create zarathustra audio element and play
// pause functions

var nearlyThere = document.createElement("audio");
nearlyThere.setAttribute('src', './resources/audio/AlsoSprachZarathustra.mp3');
function playZara() {
  nearlyThere.play();
}
function pauseZara() {
  nearlyThere.pause();
}

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped') == true) {
    return;
  }

    $card.css({'background-color': $card.data('color'), 'font-size': '7rem', 'font-weight': 900, 'color': 'rgb(255, 255, 255)'});
    $card.text($card.data('value'));
    $card.data('flipped', true);
    $game.data('flippedCards').push($card);

  if ($game.data('flippedCards').length == 2) {
    if ($game.data('flippedCards')[0].data('value') == $game.data('flippedCards')[1].data('value')) {
      for (var i = 0; i < $game.data('flippedCards').length; i++) {
        $game.data('flippedCards')[i].css('background-color', 'rgb(153,153,153)');
        $game.data('flippedCards')[i].css('color', 'rgb(204,204,204)');
        // store cards left
        $game.data('cardsLeft').push($game.data('flippedCards')[i]);
      }
    } else {
      var card1 = $game.data('flippedCards')[0];
      var card2 = $game.data('flippedCards')[1];
      setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
      }, 350);
    }
    $game.data('flippedCards').splice(0,2);
  }

  // if statement to determine state of trigger array

  if ($game.data('flippedCards').length == 1 && $game.data('cardsLeft').length == 12) {
    $game.data('trigger').push($game.data('flippedCards')[0]);
  }

  // if statement to play zarathustra

  if ($game.data('trigger').length == 1 && $game.data('flippedCards').length == 1) {
    playZara();
  }

  // if statement to stop zarathustra 

  if ($game.data('cardsLeft').length == 16) {
    pauseZara();
  }
};
