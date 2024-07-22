const express = require("express");
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
    res.render("welcome");
});

router.get("/signup", function (req, res) {
    let sessionInputData = req.session.inputData;
    
    if(!sessionInputData){ // setting default values
        sessionInputData = {
            hasError: false,
            email: '',
            confrimEmail: '',
            password: ''
        };
    }

    // to delete the data in the session to free excess memory
    // as we have already extracted it
    req.session.inputData = null;

    res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
    let sessionInputData = req.session.inputData;
    
    if(!sessionInputData){ // setting default values
        sessionInputData = {
            hasError: false,
            email: '',
            password: ''
        };
    }

    // to delete the data in the session to free excess memory
    // as we have already extracted it
    req.session.inputData = null;

    res.render("login", {inputData: sessionInputData});
});

router.post("/signup", async function (req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredConfirmEmail = userData['confirm-email'];
    const enteredPassword = userData.password;

    // validating user input
    if(!enteredEmail || 
        !enteredConfirmEmail || 
        !enteredPassword || 
        enteredPassword.trim().length < 6 || 
        enteredConfirmEmail !== enteredEmail || 
        !enteredEmail.includes('@')
    ){
        // store the data at the server using session
        req.session.inputData = {
            hasError: true,
            message: 'Invalid input - please check your data',
            email: enteredEmail,
            confrimEmail: enteredConfirmEmail,
            password: enteredPassword
        };

        req.session.save(function(){
            res.redirect('/signup');
        });
        return; // this is to prevent execution of further code
    }

    // checking for existing user
    const existingUser = await db
        .getDb()
        .collection('users')
        .findOne({email: enteredEmail});
    
    if(existingUser){
        console.log('User still exists');
        req.session.inputData = {
            hasError: true,
            message: 'User exists already!',
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword
        };
        req.session.save(function(){
            res.redirect('/signup');
        });
        return;
    }

    // hashing password using bcryptjs
    const hashedPassword = await bcrypt.hash(enteredPassword, 12);

    const user = {
        email: enteredEmail,
        password: hashedPassword
    };

    await db.getDb().collection('users').insertOne(user);
    console.log('User added');
    res.redirect('/login');
});

router.post("/login", async function (req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;

    const existingUser = await db
        .getDb()
        .collection('users')
        .findOne({email: enteredEmail});

    if(!existingUser){
        req.session.inputData = {
            hasError: true,
            message: 'Could not log you in - please check your credentials!',
            email: enteredEmail,
            password: enteredPassword
        };  
        req.session.save(function(){
            res.redirect('/login');
        });
        return;
    }

    const passwordEqual = await bcrypt.compare(enteredPassword, existingUser.password);

    if(!passwordEqual){
        req.session.inputData = {
            hasError: true,
            message: 'Could not log you in - please check your credentials!',
            email: enteredEmail,
            password: enteredPassword
        };
        req.session.save(function(){
            res.redirect('/login');
        });
        return;
    }

    // to store the info of the user along with the session
    req.session.user = { id: existingUser._id.toString(), email: existingUser.email};
    req.session.isAuthenticated = true;

    // by default session is stored in the database automatically whenever a response is sent
    // but saving is a async task(=> slow) and redirection/sending response fast so it can be dangerous 
    // as we can redirect a user to protected part before writing the session to the database
    // and the user may not be able to access it because the db is not updated

    // so we manually save the session and call redirect once the saving is completed
    req.session.save(function(){
        console.log('User is authenticated');
        res.redirect('/profile');
    });

});

router.get("/admin", async function (req, res) {
    // check user "ticket" - 
    // a) check if req has a session and
    // b) session have authentication data
    if(!req.session.isAuthenticated){ // if(!req.session.user) -> if didnt set isAuthenticated we could use this
        return res.status(401).render('401'); // access denied
    }

    const user = await db.getDb().collection('users').findOne({_id: ObjectId.createFromHexString(req.session.user.id)});
    if(!user || !user.isAdmin){
        res.status(403).render('403');
    }

    res.render("admin");
});

router.get("/profile", function (req, res) {
    // check user "ticket" - 
    // a) check if req has a session and
    // b) session have authentication data
    if(!req.session.isAuthenticated){ // if(!req.session.user) -> if didnt set isAuthenticated we could use this
        return res.status(401).render('401'); // access denied
    }
    res.render("profile");
});

router.post("/logout", function (req, res) {
    // clear user data
    req.session.user = null;
    req.session.isAuthenticated = false;
    // no need to save manually because we are redirecting the user where authentication is not needed
    res.redirect('/');
});

module.exports = router;