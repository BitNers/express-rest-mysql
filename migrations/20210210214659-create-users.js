'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const User = queryInterface.createTable('users',{
      id_user: {
          type: Sequelize.INTEGER, 
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unsigned: true
      },
      username: {
          type: Sequelize.STRING,
          allowNull: false
      },
      passwd: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          isEmail: true
      }
      

  });
    return User;
  },

  
  down: queryInterface => queryInterface.dropTable('users'),
  };  