module.exports = (app)=>{
    const guestControl = require("../controllers/guest.controller");

    // Access Home Page
    app.get('/', async (req,res)=>{res.render('pages/home', {title: "Home", data: "Hearts/Wires (In the House of Flies)"})})
    // Create new User
    app.post('/', guestControl.createUser)

    // Logging in
    app.post('/login', guestControl.validateLogin)
   
}