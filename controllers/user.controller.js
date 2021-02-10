const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.User;

exports.findAllUsers = (req, res) => {
   User.findAll({attributes: {exclude: ['passwd']}})
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
    if (!req.body.username || !req.body.passwd || !req.body.email) {res.status(400).json({status: "err",message: "User and Password cannot be empty!"});
        return;
      }
      const user = {
          username: req.body.username,
          passwd: bcrypt.hashSync(req.body.passwd, 8),
          email: req.body.email
      }

      User.create(user)
      .then(data=>{res.json({status: "ok", message: "User was created."})})
      .catch(err=>{res.status(500).json({status: "error", message: err || "Something went wrong while creating the new user"})});
}
