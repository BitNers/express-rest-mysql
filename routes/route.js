module.exports = (app)=>{
    const userControl = require("../controllers/user.controller");
    
    app.get('/', async (req,res,next)=>{
        res.json({status: true});
        next();
    })

    app.post('/', userControl.createUser)
    app.get('/users', userControl.findAllUsers)
    app.get('/users/:name', userControl.findByName)
    // app.get('/users/:id', userControl.encontrarPorId)

}