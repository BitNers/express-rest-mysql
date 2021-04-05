'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      queryInterface.createTable('issues',{
      id_issue: {
          type: Sequelize.INTEGER, 
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unsigned: true
      },

      category:{
        type: Sequelize.ENUM('Bunker', 'Profile', 'Home Page', 'Feedback', 'Others'),
        allowNull: false,
      },

      title: {
          type: Sequelize.STRING,
          allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          isEmail: true
        }
    },
      createdAt:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },

  }); 
  },

  down: async (queryInterface, Sequelize) => {
 
  }
};
