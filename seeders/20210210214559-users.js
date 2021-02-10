'use strict';

const { query } = require("express");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',[
    {
      username: 'John Doe',
      email: 'test@medium.com',
      passwd: '$2b$08$J1GgFmkGMZME/NMVnPveSu9IMGOpTGoscnXanFrpqv1GhgNNf8Wei',
    },
    {
      username: 'Johny Johny',
      email: 'test2@medium.com',
      passwd: '$2b$08$J1GgFmkGMZME/NMVnPveSu9IMGOpTGoscnXanFrpqv1GhgNNf8Wei',
    },
    {
      username: 'John Wick',
      email: 'john@wick.com.br',
      passwd: '$2b$08$J1GgFmkGMZME/NMVnPveSu9IMGOpTGoscnXanFrpqv1GhgNNf8Wei',
    },
    {
      username: 'Joker Arthur',
      email: 'j0ker@arthur.ch',
      passwd: '$2b$08$J1GgFmkGMZME/NMVnPveSu9IMGOpTGoscnXanFrpqv1GhgNNf8Wei',
    },
  ], {}),
  down:  (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
