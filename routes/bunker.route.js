module.exports = (app)=>{
    
    const bunkerControl = require("../controllers/bunker.controller");
    const Auth = require('../middleware/auth.middleware');

    app.use('/profile/bunker', Auth.isAuthenticated);
    
    app.get('/profile/bunker', bunkerControl.getBunker);
}