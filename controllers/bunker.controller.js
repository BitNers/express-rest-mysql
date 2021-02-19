const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.User;

exports.getBunker = async (req,res)=>{
   res.render('pages/bunker/home', {layout:false});
}
