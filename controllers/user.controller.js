const db = require('../database/models');
const User = db.User;

exports.findAllUsers = (req, res) => {

   User.findAll({attributes: {exclude: ['passwd']}}).then(users=>{
       res.json(users);
   })
};

exports.findByName = (req,res)=>{
    const name = req.params.name;
    User.findOne({
        where: {username: name}, 
        attributes: {
         exclude: ['passwd']}})
         .then(data=>{res.json(data)}).catch(err=>{res.status(500).send("Error while finding the user.")});
}

exports.createUser = (req,res)=>{
    if (!req.body.username || !req.body.passwd) {
        res.status(400).json({status: "err",message: "User and Password cannot be empty!"
        });
        return;
      }
      const user = {
          username: req.body.username,
          passwd: req.body.passwd,
      }

      User.create(user).then(data=>{res.json({status: "ok", message: "User created."})});
}
