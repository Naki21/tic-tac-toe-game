'use strict';
const api = require('./game-api');
const ui = require('./game-ui');
const store = require('../store');
const state = require('./game-state');

const onNewGame = function(event) {
  event.preventDefault();
  api.createGame()
    .then(ui.success)
    .catch(ui.failure);
};


const makeMove = function(index) {
  let data = {
    "game": {
      "cell": {
        "index": index,
        "value": store.turn,
      },
      "over": false
    },
  };
  api.updateBoard(data)
    .then(ui.moveSuccess)
    .catch(ui.failure);

};
const updateBox = function () {
  $(this).text(store.turn);
  state.updateCell($(this).data("index"), store.turn);
  makeMove($(this).data("index"));
};



const addGameHandlers = () => {
  $('.new-game-button').on('submit', onNewGame);
  $('.box').on('click', updateBox);
};

module.exports = {
  addGameHandlers,
};
