const db = require('../database/models');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const User = db.User;

function decodeJwt(txt){
  return jwt.verify(txt, process.env.ACCESS_TOKEN_SECRET)
}

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

exports.findAllUsers = async (req, res) => {
    await User.findAll({attributes: {exclude: ['passwd']}, limit:250})
    .then(users=>{res.json(users);})
    .catch(err=>{res.status(500).json({status: "error", message: err || "Something went wrong while try to find all users."})})
 };

 

exports.getInfo = async (req,res)=>{
  await User.findOne({
         where: {email: req.session.email}, 
         attributes: {
             exclude: ['passwd']}})
          .then(data=>{
            data.email = MaskData.maskEmail2(data.email, MaskEmailOption);
            res.render('pages/profile/home', {data:{title: "Profile", data: data}});
          })
          .catch(err=>{res.status(500).json({status: "error", message: "Something went wrong while try to find user by name."})});
 }