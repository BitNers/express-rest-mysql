exports.isAuthenticated = async (req,res,next)=>{
    if(!req.session.email)
        return res.status('403').redirect('/');

    res.locals.email = req.session.email;
    next();
};
exports.AlreadyLogged = async (req,res,next)=>{
    if(req.session.email){
        res.locals.email = req.session.email;
        return res.redirect('/profile');
    }
    next();
};