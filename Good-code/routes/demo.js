const express = require('express');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const db = require("../data/database");

const router = express.Router();

router.get("/", function(req, res){
    res.render("home");
});

router.get("/signup", function(req, res){
    let sessionInputData = req.session.inputData;

    if(!sessionInputData){
        sessionInputData = {
            hasError: false,
            email: '',
            confirmEmail: '',
            password: ''
        }
    }

    req.session.inputData = null;

    res.render("signup", {inputData: sessionInputData});
});

router.post("/signup", async function(req, res){
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredConfirmEmail = userData['confirm-email'];
    const enteredPassword = userData.password;

    // validating user input
    if(!enteredEmail||
       !enteredConfirmEmail ||
       !enteredPassword ||
       enteredPassword.trim().length < 6 ||
       enteredConfirmEmail !== enteredEmail ||
       !enteredEmail.includes('@')
    ){
        req.session.inputData = {
            hasError: true,
            message: 'Invalid input - please check your input',
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword
        };

        req.session.save(function(){
            res.redirect('/signup');
        })
        return;
    }

    // checking for existing user
    const existingUser = await db
        .getDb()
        .collection('users')
        .findOne({email: enteredEmail});

    // if existing user found
    if(existingUser){
        console.log('User already exists');
        req.session.inputData = {
            hasError: true,
            message: 'User exists already',
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword
        }

        req.session.save(function(){
            res.redirect('/signup');
        })
        return;
    }

    // if the signup is valid
    // hashing password
    const hashedPassword = await bcrypt.hash(enteredPassword, 12);

    const user = {
        email: enteredEmail,
        password: hashedPassword
    };

    await db.getDb().collection('users').insertOne(user);
    console.log('User added');
    res.redirect('/login');
});

router.get("/login", function(req, res){
    let sessionInputData = req.session.inputData;

    if(!sessionInputData){
        sessionInputData = {
            hasError: false,
            email: '',
            password: ''
        }
    }

    req.session.inputData = null;

    res.render("login", {inputData: sessionInputData});
});

router.post("/login", async function(req, res){
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password

    const existingUser = await db
        .getDb()
        .collection('users')
        .findOne({email: enteredEmail});

    // if wrong email
    if(!existingUser){
        console.log('wrong email');
        req.session.inputData = {
            hasError: true,
            message: 'Could not log you in - please check your credentials!',
            email: enteredEmail,
            password: enteredPassword
        }

        req.session.save(function(){
            res.redirect('/login');
        })
        return;
    }

    // checking for password
    const passwordEqual = await bcrypt.compare(enteredPassword, existingUser.password);

    // password check failed
    if(!passwordEqual){
        console.log('wrong pass');
        req.session.inputData = {
            hasError: true,
            message: 'Could not log you in - please check your credentials!',
            email: enteredEmail,
            password: enteredPassword
        }

        req.session.save(function(){
            res.redirect('/login');
        })
        return;
    }

    // storing user info along with session
    req.session.user = {id: existingUser._id.toString(), email: existingUser.email};
    req.session.isAuthenticated = true;

    req.session.save(function(){
        console.log('User is authenticated');
        res.redirect('/admin');
    })
});

router.get("/admin", async function(req, res){
    if(!res.locals.isAuth){
        return res.status(401).render('401');
    }
    
    let sessionInputData = req.session.inputData;
    if(!sessionInputData){
        sessionInputData = {
            hasError: false,
            title: '',
            content: ''
        }
    }
    req.session.inputData = null;

    const blogs = await db
        .getDb()
        .collection('blogs')
        .find({}, {title: 1, content: 1, userEmail: 1})
        .toArray();

    // console.log(blogs);

    res.render("admin", {inputData: sessionInputData, blogs: blogs});
});

router.post("/admin", async function(req, res){
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;
    const userEmail = req.session.user.email;

    if(!enteredContent ||
        !enteredTitle ||
        enteredContent.trim() === '' ||
        enteredTitle.trim() === ''
    ){
        req.session.inputData = {
            hasError: true,
            message: "Please fill in all the fields",
            title: enteredTitle,
            content: enteredContent
        }

        req.session.save(function(){
            res.redirect('/admin');
        })

        return;
    }

    const result = await db.getDb().collection('blogs').insertOne({
        title: enteredTitle,
        content: enteredContent,
        userEmail: userEmail
    })

    res.redirect('/admin');
});

router.get('/admin/:bId/view', async function(req, res){
    const blogPost = await db
        .getDb()
        .collection('blogs')
        .findOne({_id: ObjectId.createFromHexString(req.params.bId)});

    if(!blogPost){
        return res.status(404).render('404');
    }

    let sessionInputData = req.session.inputData;
    if(!sessionInputData){
        sessionInputData = {
            hasError: false
        };
    }
    req.session.inputData = null;

    res.render('update-blog', {inputData: sessionInputData, blog: blogPost});
});

router.post('/admin/:bId/edit', async function(req, res){
    const blog = await db
        .getDb()
        .collection('blogs')
        .findOne({_id: ObjectId.createFromHexString(req.params.bId)});

    // if another user is editing someone else's post
    if(req.session.user.email !== blog.userEmail){
        req.session.inputData = {
            hasError: true,
            message: 'You can only edit blogs posted by you!'
        }

        req.session.save(function(){
            const link = `/admin/${req.params.bId}/view`;
            res.redirect(link);
        })

        return;
    }

    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;

    if(!enteredTitle ||
       !enteredContent ||
       enteredTitle.trim() === '' ||
       enteredContent .trim() === ''
    ){
        req.session.inputData = {
            hasError: true,
            message: 'Invalid input - please fill all the fields'
        };

        req.session.save(function(){
            const link = `/admin/${req.params.bId}/view`;
            res.redirect(link);
        })

        return;
    }

    await db
        .getDb()
        .collection('blogs')
        .updateOne(
            {_id: ObjectId.createFromHexString(req.params.bId)},
            {$set:{
                title: req.body.title,
                content: req.body.content
            }}
        )
    
    res.redirect('/admin');
});

router.post('/admin/:bId/delete', async function(req, res){
    // console.log(req.params.pId);
    const blog = await db.getDb().collection('blogs').findOne({_id: ObjectId.createFromHexString(req.params.bId)});

    // check if the author is deleting the post or not
    if(req.session.user.email !== blog.userEmail){
        req.session.inputData = {
            hasError: true,
            message: `You cannot delete someone else's blog`
        }

        req.session.save(function(){
            res.redirect('/admin');
        })

        return;
    }

     const result = await db
        .getDb()
        .collection('blogs')
        .deleteOne({_id: new ObjectId(req.params.bId)});

    res.redirect('/admin');
});

router.post('/logout', function(req, res){
    // clear user data
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
});

module.exports = router;