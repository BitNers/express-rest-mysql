// This controller will manage the User functions: Update informations, send reports, access Bunker.

// const jwt = require('jsonwebtoken');
const db = require('../database/models');
const bcrypt = require('bcrypt');
const MaskData = require('maskdata');
const getSize = require('get-folder-size');
const session = require('express-session');
const User = db.User;

/* function decodeJwt(txt){
  return jwt.verify(txt, process.env.ACCESS_TOKEN_SECRET)
}

exports.findAllUsers = async (res) => {
    await User.findAll({attributes: {exclude: ['passwd']}, limit:250})
    .then(users=>{res.json(users);})
    .catch(err=>{res.status(500).json({status: "error", message: err || "Something went wrong while try to find all users."})})
 };*/

const MaskEmailOption = {
  maskWith: "*", 
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};

exports.logout = async (req,res)=>{
  if(req.session){
    req.session.destroy(); 
  }
  return res.redirect('/');
}




exports.getInfo = async (req,res)=>{
  await User.findOne({
         where: {email: req.session.email}, 
         attributes: {exclude: ['passwd','passwd_bunker']}
        })
         .then(data=>{
            data.MaskedEmail = MaskData.maskEmail2(data.email, MaskEmailOption);
            data.setDataValue("createdAt",  data.createdAt.toLocaleDateString("pt-BR"));
            getSize(data.path_bunker, (err,size)=>{
              if(!err){
                let fSize = (size /(1024**3)).toFixed(2);
                let fPercent = ((fSize/process.env.MAX_FREE_SPACE)*100).toFixed(0);
                data.setDataValue("sizeFolder", {usedSpace: fSize, percentSpace: fPercent});
                res.render('pages/profile/home', {data:{title: "Profile", data: data}});
              }else{
                console.log(`Something went wrong while try to get user folder size: ${err}`);
              }
            });
            
          })
          .catch(err=>{res.status(500).json({status: "error", message: `Something went wrong while try to find user by name: ${err}`})});
}

exports.updatePassword = async (req,res)=>{
  // Authenticate the User
  if (req.body._method != "PATCH" || req.session.email != req.params.email)
    return res.status(405).json({status: "error", message: "Forbidden Method Access."})  

  const {currentPasswd, newPasswd} = req.body;

  // Get the current Password in DB and compare with the sent by user.
  await User.findOne({
    where: {email: req.params.email},
    attributes: ['id_user','email', 'passwd']
  })
  .then(data=>{
  
    if(!bcrypt.compareSync(currentPasswd, data.passwd))
      return res.status(400).json({status: "error", message:"Whoops, current password not match."})
  
  // Compare if User is trying to update the password with the current password in DB
    if(bcrypt.compareSync(newPasswd, data.passwd))
      return res.status(400).json({status: "error", message:"Whoops, you are trying to update with the same password."})
    
    let newPass = bcrypt.hashSync(newPasswd, 8)

    data.update({passwd: newPass},{where: {id_user: data.id_user}})
    res.redirect('/profile')
  })
  .catch(err=>{res.status(500).json({status: "error", message:  `Something went wrong while try to update your password: ${err}`})})

}
exports.updateEmail = async (req,res)=>{
    res.json(req.params.body);
}