// This Controller will manage the Bunker functions.
const fs = require('fs');
const db = require('../database/models');
const User = db.User;

function readDirectory(usrpath){
   
}

exports.getBunker = async (req,res)=>{


   await User.findOne({
      where: {email: req.session.email}, 
      attributes: {
          exclude: ['passwd']}})
       .then(data=>{

       
         //res.json({data});
         res.render('pages/bunker/home', {layout:false, data: {title: "Bunker", data:data}});
       })
       .catch(err=>{res.status(500).json({status: "error", message: err || "Something went wrong while try to find user by name."})});

}
