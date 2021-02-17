const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.User;

exports.createUser = async (req,res)=>{
    const {username, passwd, email } = req.body;
    if(!username || !passwd || !email)
        return res.status(400).json({status: "err",message: "You must fill all these fields: Email, Username and Password."});
    
    let senha = await bcrypt.hash(passwd,8);
    await User.create({username, passwd: senha, email})
    .then(data=>{res.json({status: "ok", message: "User was created."})})
    .catch(err=>{res.status(500).json({status: "error", message: "Something went wrong while creating the new user."})});
}

exports.validateLogin = async (req, res) => {
        if(req.session.email)
            return res.redirect('/profile');
        
        
        const {email, passwd} = req.body;
        if(!email || !passwd)
            return res.status(401).json({status: 'error', message: 'Missing required email or password fields'});
        
  
        const usr = await User.findOne({
            where: {email},
            attributes: {
                exclude: ['username', 'apitoken', 'createdAt', 'updatedAt','role']}
        })
        
        if(!usr)
            return res.status(404).json({status: 'error', message: 'This Email does not exist.'});
  
        if(await bcrypt.compare(passwd, usr.passwd)){
            let sess = req.session;
            sess.email = email;
            res.redirect('/profile');
            // const access = jwt.sign({id_user: usr.id_user}, process.env.ACCESS_TOKEN_SECRET);
            // await User.update({token: access},{where: {email: email}})
            // res.cookie("access-token", access, {httpOnly: true, secure: false}); // Secure: True (HTTPS)
            

        }else{res.status(401).json({status: "error", message: "Email or password is wrong."});}   
  
  }
