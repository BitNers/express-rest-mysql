const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.User;

exports.findAllUsers = (req, res) => {
   User.findAll({attributes: {exclude: ['passwd']}, limit:250})
   .then(users=>{res.json(users);})
   .catch(err=>{res.status(500).json({status: "error", message: err || "Something went wrong while try to find all users."})})
};

exports.findById = (req,res)=>{
    const id = req.params.id;
    User.findOne({
        where: {id_user: id}, 
        attributes: {
            exclude: ['passwd']}})
         .then(data=>{res.json(data)})
         .catch(err=>{res.status(500).json({status: "error", message: err || "Something went wrong while try to find user by name."})});
}


exports.createUser = (req,res)=>{
      const {username, passwd, email } = req.body;
      if(!username || !passwd || !email){
        res.status(400).json({status: "err",message: "You must fill all these fields: Email, Username and Password."});
      }

      User.create({username, passwd, email})
      .then(data=>{res.json({status: "ok", message: "User was created."})})
      .catch(err=>{res.status(500).json({status: "error", message: "Something went wrong while creating the new user"})});
}