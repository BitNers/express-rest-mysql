module.exports = (app)=>{
    const userControl = require("../controllers/user.controller");
    const userLogin = require("../controllers/auth.controller");

    app.get('/', async (req,res,next)=>{res.json({status: "ok", message: "It's working."});})

    app.post('/', userControl.createUser)
    app.post('/login', userLogin.validateLogin)

    app.get('/users', userControl.findAllUsers)
    app.get('/users/:id', userControl.findById)

}