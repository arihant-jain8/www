const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const demoRoutes = require('./routes/demo');
const { ObjectId } = require('mongodb');

const MongoDbStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDbStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'good-code',
    collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret:'ohnosupersecret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(async function(req, res, next){
    const user = req.session.user;
    const isAuth = req.session.isAuthenticated;

    if(!user || !isAuth){
        return next();
    }

    const userDoc = await db.getDb().collection('users').findOne({_id: ObjectId.createFromHexString(user.id)});
    res.locals.isAuth = isAuth;

    next();
})

app.use(demoRoutes);

app.use(function(err, req, res, next){
    res.status(500).render('500');
})

db.connectToDatabase().then(function(){
    app.listen(6969);
})