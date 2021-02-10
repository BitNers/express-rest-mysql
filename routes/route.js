module.exports = (app)=>{
    const userControl = require("../controllers/user.controller");
    
    app.get('/', async (req,res,next)=>{
        res.json({status: "ok", message: "It's working."});
        next();
    })

    app.post('/', userControl.createUser)
    app.get('/users', userControl.findAllUsers)
    app.get('/users/:id', userControl.findById)

}