const bcrypt = require('bcrypt');
const db = require('../database/models');
const jwt = require('jsonwebtoken');
const User = db.User;

exports.validateLogin = async (req, res, next) => {
    try{
        const {email, passwd} = req.body;
        if(!email || !passwd){
            res.status(400).json({status: 'error', message: 'Missing required email or password fields'})
        }

        const usr = await User.findOne({
            where: {email},
            attributes: {
                exclude: ['id_user', 'username', 'createdAt', 'updatedAt']}
        })
        
        if(!usr){
            res.status(404).json({status: 'error', message: 'This Email does not exist.'})
            next();
        };

        const LoggedIn = await bcrypt.compare(passwd, usr.passwd);

        // ToDo -> Session with JWT

        res.send({status: "ok", message: "user authenticated."});
        
    }catch(err){
        res.status(500).json({status: 'error', message: 'An error occurred trying to process your request.'})
    }
}

