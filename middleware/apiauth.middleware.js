const jwt = require('jsonwebtoken');
const db = require('../database/models');
const User = db.User;

exports.alreadyLogged = async (req,res,next)=>{
    let token = await User.findOne({
        where: {token: req.cookies['access-token']},
        attributes: {
            exclude: ['id_user', 'email', 'passwd', 'username', 'createdAt', 'updatedAt','role']}
    });   

    if(token.token == '')
        return res.redirect('/');
    next();

};