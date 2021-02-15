const jwt = require('jsonwebtoken');

exports.alreadyLogged = (req,res,next)=>{

    let token = req.cookies['access-token']

    if(!token)
        return res.redirect('/');


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decode)=>{
        if(err)
            return res.status(500).json({status: "ok", message:err||"Server Error Handling."})
        next();
    });
};