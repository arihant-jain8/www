function createUserSession(req, res,action){
    req.session.uid = user._id.toString();
}

module.exports = {
    createUserSession: createUserSession,
    
}