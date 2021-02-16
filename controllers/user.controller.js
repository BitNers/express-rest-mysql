const db = require('../database/models');
const jwt = require('jsonwebtoken');
const User = db.User;

function decodeJwt(txt){
  return jwt.verify(txt, process.env.ACCESS_TOKEN_SECRET)
}

exports.logout = async (req,res)=>{
  let user = decodeJwt(req.cookies['access-token']);
  await User.update({token: ""},{where: {id_user: user.id_user}})
  res.clearCookie('access-token').redirect('/');
}

/* exports.deleteUser = async (req,res)=>{
  let user = decodeJwt(req.cookies['access-token']);
    await User.destroy({where: {id_user: user.id_user}})
    .then(data=>{res.json({status: "ok", message: "Your account was deleted."}).clearCookie('access-token')})
    .catch(err=>{res.status(500).json({status: "error", message: "Something went wrong while deleting the user."})});
  }*/
  

exports.findAllUsers = async (req, res) => {
    await User.findAll({attributes: {exclude: ['passwd']}, limit:250})
    .then(users=>{res.json(users);})
    .catch(err=>{res.status(500).json({status: "error", message: err || "Something went wrong while try to find all users."})})
 };

 

exports.getInfo = async (req,res)=>{
  let user = decodeJwt(req.cookies['access-token']);
     await User.findOne({
         where: {id_user: user.id_user}, 
         attributes: {
             exclude: ['passwd', 'token']}})
          .then(data=>{res.json(data)})
          .catch(err=>{res.status(500).json({status: "error", message: "Something went wrong while try to find user by name."})});
 }
 