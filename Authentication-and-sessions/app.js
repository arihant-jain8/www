const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session'); // third party storage for session (maintained by mongodb)

const db = require('./data/database');
const demoRoutes = require('./routes/demo');
const { ObjectId } = require('mongodb');

const MongoDbStore = mongodbStore(session); // to connect session with storage

const app = express();

const sessionStore = new MongoDbStore({
  uri: 'mongodb://localhost:27017', // path to our db - for locally running mongodb server
  databaseName: 'auth-demo', // same db used in this project
  collection: 'sessions' // collection in which sessions will be stored
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// session function
app.use(session({
  secret: 'super-secret', // key to secure the session or session cookie to prevent faking
  resave: false, // only updated in the database if data is changed (disadvantage when multiple changes)
  saveUninitialized: false, // if the session is not changed then no updates are made preventing unnecessary updates
  store: sessionStore // where the data should be stored (defined above)
}));

app.use(async function(req, res, next){
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;
  
  if(!user || !isAuth){
    return next();
  }
  
  const userDoc = await db.getDb().collection('users').findOne({_id: ObjectId.createFromHexString(user.id)});
  const isAdmin = userDoc.isAdmin;
  
  // res.locals - allows to set global values available on all the routes for particular request response cycle
  res.locals.isAdmin = isAdmin;
  res.locals.isAuth = isAuth;

  next(); // next tells the browser to move on the next middleware or route - for eg. demoRoutes in our case
});

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(6969);
});
