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
        role: {
            type: Sequelize.ENUM({values: ['0', '1', '2', '3']}),
            defaultValue: '0',
            allowNull: false,
          },
    
          login_token: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        passwd: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return User;
};