const path = require('path');
const fs = require('fs');

const express = require('express');

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

app.get('/', function(req, res){
    // after adding views we can just use render function to render the ejs templates
    // const htmlPath = path.join(__dirname, "views", "index.html");
  	// res.sendFile(htmlPath);
	res.render('index');
});

app.get('/restaurants', function(req, res){
    // const htmlPath = path.join(__dirname, 'views', 'restaurants.html');
    // res.sendFile(htmlPath);
	const filePath = path.join(__dirname, 'data', 'restaurants.json');
    
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

	res.render('restaurants', {numOfRestaurants: storedRestaurants.length});
});

app.get('/recommend', function(req, res){
	res.render('recommend');
});

app.post('/recommend', function(req, res){
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect('/confirm');
});

app.get('/confirm', function(req, res){
    res.render('confirm');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.listen(6969);