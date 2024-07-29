function guardRoute(req, res){
    if(!res.locals.isAuth){
        return res.redirect('/401');
    }

    next();
}

module.exports = guardRoute;