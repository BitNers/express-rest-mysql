const db = require('../database/db_connect');
module.exports = (app)=>{

    app.use('/', async (req,res,next)=>{
        res.json({status: true});
        next();
    })

    app.use('/getAllUsers', async(req,res,next)=>{
       
    })

}