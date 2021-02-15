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
          validate:{
            isEmail: true
          }
      },

      role: {
        type: Sequelize.ENUM({values: ['0','1', '2', '3']}),
        defaultValue: '0',
        allowNull: false,
      },

      login_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
     },

       updatedAt:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
    }
  }); 
},

  down: queryInterface => queryInterface.dropTable('users'),
  };  