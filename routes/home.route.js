module.exports = (app)=>{
    const guestControl = require("../controllers/guest.controller");

    // Access Home Page
    app.get('/', async (req,res,next)=>{res.json({status: "ok", message: "Home Page."});})

    // Create new User
    app.post('/', guestControl.createUser)

    // Logging in
    app.post('/login', guestControl.validateLogin)
   
}