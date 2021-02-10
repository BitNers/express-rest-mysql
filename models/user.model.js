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
            unique: true
        },
        passwd: {
            type: Sequelize.STRING,
            allowNull: false
        },

    })
    return User;
};