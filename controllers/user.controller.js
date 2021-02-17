const db = require('../database/models');
const jwt = require('jsonwebtoken');
const User = db.User;

function decodeJwt(txt){
  return jwt.verify(txt, process.env.ACCESS_TOKEN_SECRET)
}

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
          .then(data=>{res.render('pages/profile/homeprofile', {data:{title: "Profile", data: data}}); })
          .catch(err=>{res.status(500).json({status: "error", message: "Something went wrong while try to find user by name."})});
 }