'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('users',{
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

      path_bunker: {
        type: Sequelize.STRING,
        allowNull: true
      },

      passwd_bunker: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email_verified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
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