module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define('users',{
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
            
        },
      
        path_bunker: {
            type: Sequelize.STRING,
            allowNull: true
          },

        passwd_bunker:{
            type: Sequelize.STRING,
        },
        
        email_verified:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
            },

        passwd: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sizeFolder: {type: Sequelize.VIRTUAL},
    });
    return User;
};