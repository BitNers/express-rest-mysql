const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.User;

exports.getBunker = async (req,res)=>{
   await User.findOne({
      where: {email: req.session.email}, 
      attributes: {
          exclude: ['passwd']}})
       .then(data=>{
         res.render('pages/bunker/home', {layout:false, data: {title: "Bunker", data:data}});
       })
       .catch(err=>{res.status(500).json({status: "error", message: "Something went wrong while try to find user by name."})});

}
