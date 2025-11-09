"use strict";

// Slecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const currnet0El = document.getElementById("current--0");
const currnet1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions

let scores, currnetScore, activePlayer, playing;

const init = function () {
  // resets all variables (scores, current, activePlayer, etc.)
  // and updates UI elements to their initial state
  scores = [0, 0];
  currnetScore = 0;
  activePlayer = 0;
  playing = true;

  currnet0El.textContent = 0;
  currnet1El.textContent = 0; // = document.getElementById("current--1");
  score0El.textContent = scores[0];
  score1El.textContent = scores[1]; // = document.getElementById("score--1");

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currnetScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if ture, switch to next player
    if (dice !== 1) {
      // Add dice to currnet score
      currnetScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currnetScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currnetScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer} `)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer} `)
        .classList.remove("player--active");
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

/* 
   Note:
  if (activePlayer === 0) {
    player0El.classList.remove("player--winner");
    player0El.classList.add("player--active");
  } else {
    player1El.classList.remove("player--winner");
    activePlayer = 0;
    player0El.classList.add("player--active");
  }

  ✅ Logical is correct, but it's better to reset activePlayer = 0 directly 
  and clear both players' classes before adding "player--active" again.
  (More clean, less risk of wrong player staying active)
*/
