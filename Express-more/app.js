const path = require('path');

const express = require('express');
// const uuid = require('uuid'); // gives a method to randomly generate unique id
// ^ shifted to restaurants.js in util

// import defualt routes
const defaultRoutes = require('./routes/default');
// import restaurants routes
const restaurantRoutes = require('./routes/restaurants');

const app = express();

// templating engine
// v this is to let expess know where it will find our template files, file path for views/templates
app.set("views", path.join(__dirname, "views"));
// view option -> tells express that we want to use special engine, ejs -> name of the engine
app.set("view engine", "ejs");

// middleware to load static files like css and js
// We're telling Express that for every incoming request, it should check if
// it's a request to a file that can be found here in this public folder.
// And if it is, then the file will be returned as a response.
// If it's not, the request will be forwarded to our other routes.
// And if there, we also have no route that handles the request, the request will fail.
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// using default routes
app.use('/', defaultRoutes);
// using restaurant routes
app.use('/', restaurantRoutes);

app.get('/404', function(req, res){
    res.render('404');
});


// middleware to catch all the requests that are not handled above
// it will kick in when we have a req that is not handled by any other routes
app.use(function(req, res){
    res.status(404).render('404');
});

// special error handling function
// to handle server side errors
app.use(function(error, req, res, next){
    res.status(500).render('500');
});

app.listen(6969);