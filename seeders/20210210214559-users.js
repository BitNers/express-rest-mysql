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
      username: 'Wesley',
      email: 'adedonha@adedonha.com.br',
      passwd: '$2b$08$gS1eH2ZmcW8/b8Lmo5ueT.u2yyuKvSSVKf3lb5LXkBZfjipvB3Uzu',
    },
  ], {}),
  down:  (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
