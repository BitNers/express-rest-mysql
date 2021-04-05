module.exports = (app)=>{
    
    const userControl = require("../controllers/user.controller");
    const Auth = require('../middleware/auth.middleware');

    app.use('/profile', Auth.isAuthenticated);
    
    app.get('/profile', userControl.getInfo);
    app.get('/profile/logout', userControl.logout);
    app.post('/profile/updatePassword/:email', userControl.updatePassword);
    app.patch('/profile/updateEmail/:email', userControl.updateEmail);
}