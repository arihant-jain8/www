const express = require('express');
const uuid = require('uuid');

// requirement for our own file
const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', function(req, res){
    // to get the query parameter in the url
    let order = req.query.order;
    // console.log(order);
    let nextOrder = 'desc';

    
    // setting default to asc
    if(order !== 'asc' && order !== 'desc'){
        order = 'asc';
    }
    
    if(order === 'desc') {nextOrder = 'asc';}

	// const filePath = path.join(__dirname, 'data', 'restaurants.json');
    // const fileData = fs.readFileSync(filePath);
    // const storedRestaurants = JSON.parse(fileData);
    const restaurants = resData.getStoredRestaurants();

    // to sort the restaurants alphabetically based on the query in the url
    restaurants.sort(function(resA, resB){
        if(order === 'asc' && resA.name > resB.name) {return 1;}
        else if(order === 'desc' && resA.name < resB.name) {return 1;}
        return -1;
    });

	// this is to send js variable to our "ejs" files
	res.render('restaurants', {numOfRestaurants: restaurants.length, restaurants: restaurants, nextOrder: nextOrder});
});

// here id is a key
router.get('/restaurants/:rId', function(req, res){ // domain/restaurants/r1
    const rId = req.params.rId; // to access parameters in req
    
    // const filePath = path.join(__dirname, 'data', 'restaurants.json');
    // const fileData = fs.readFileSync(filePath);
    // const storedRestaurants = JSON.parse(fileData);
    // added this as a function in "util" folder

    const restaurants = resData.getStoredRestaurants();

    for(const restaurant of restaurants){
        if(restaurant.id === rId){
            return res.render('restaurant-detail', {restaurant: restaurant}); // return - to stop function execution
        }
    }

    res.status(404).render('404');
});

router.get('/recommend', function(req, res){
	res.render('recommend');
});

router.post('/recommend', function(req, res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = resData.getStoredRestaurants();

    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    res.redirect('/confirm');
});

router.get('/confirm', function(req, res){
    res.render('confirm');
});

module.exports = router;