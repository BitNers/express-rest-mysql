// This Controller will manage the Guest Functions such as: Login/Sign-up.
const crypto = require('crypto');
const fs = require('fs'); 
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.User;

exports.createUser = async (req,res)=>{
    if(req.session.email)
            return res.redirect('/profile');
            
    const {username, passwd, passwd_confirm, email, email_confirm} = req.body;
    if(!username || !passwd || !email || !passwd_confirm || !email_confirm)
        return res.status(400).render('pages/signup', {data: {title: 'Login', data: '', err: "You must fill all fields."}});
       // return res.status(400).json({status: "err",message: "You must fill all these fields: Email, Username and Password."});
    if (passwd != passwd_confirm || email != email_confirm)
        return res.render('pages/signup', {data: {title: 'Login', data: '', err: "The email or password doesn't match."}});
    
    let senha = await bcrypt.hash(passwd,8);
    let path_bunker =  `./uploads/${username}_${email.substring(0,3)}`;
    let passwd_bunker = crypto.randomBytes(20).toString('hex');
    fs.mkdir(path_bunker, (err)=>{if(err) console.log(err)});
   
    await User.create({username, passwd: senha, email, path_bunker, passwd_bunker})
    .then(data=>{res.render('pages/login', {data: {title: 'Login', data: '', err: "", success: "Your account was created, try it now!"} })})
    .catch(err=>{res.status(500).json({status: "error", message: err||"Something went wrong while creating the new user."})});
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
            return res.render('pages/login', {data: {title: 'Login', data: '', err: "This account doesn't exist."}});
  
        if(await bcrypt.compare(passwd, usr.passwd)){
            let sess = req.session;
            sess.email = email;
            res.redirect('/profile');
            // const access = jwt.sign({id_user: usr.id_user}, process.env.ACCESS_TOKEN_SECRET);
            // await User.update({token: access},{where: {email: email}})
            // res.cookie("access-token", access, {httpOnly: true, secure: false}); // Secure: True (HTTPS)
            

        }else{
            res.render('pages/login', {data: {title: 'Login', data:'',  err: "Wrong credentials :("}})
        }
  
  }
