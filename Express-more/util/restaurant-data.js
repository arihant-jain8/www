const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants(){
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function storeRestaurants(storeableRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

// to make the above functions public when they are exported
// or exposing them
module.exports = {
    // key : value (key -> name by which it will be used in other files)
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
}