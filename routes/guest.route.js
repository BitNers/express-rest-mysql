module.exports = (app)=>{
    const guestControl = require("../controllers/guest.controller");
    const auth = require("../middleware/auth.middleware");
    // Access Home Page
    app.route('/')
    .get(async (req,res)=>{res.render('pages/home', {data:{title:"Home"}})})
    .post(guestControl.createUser)
    
    app.route('/login')
    .get(auth.AlreadyLogged,async (req,res)=>{res.render('pages/Login', {data:{title:"Login"}})})
    .post(guestControl.validateLogin);

    app.route('/signup')
    .get(auth.AlreadyLogged, async(req,res)=>{res.render('pages/signup', {data: {title: "Sign-up"}})})
    .post(guestControl.createUser);
}