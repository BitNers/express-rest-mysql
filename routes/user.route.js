module.exports = (app)=>{
    
    const userControl = require("../controllers/user.controller");
    const Auth = require('../middleware/auth.middleware');
    app.use('/profile', Auth.alreadyLogged);
    
    app.get('/profile/logout', userControl.logout);
    app.get('/profile', userControl.getInfo);
    
    
}