const express = require('express');

const router = express.Router();

router.get('/', function(req, res){
    // after adding views we can just use render function to render the ejs templates
    // const htmlPath = path.join(__dirname, "views", "index.html");
  	// res.sendFile(htmlPath);
	res.render('index');
});

router.get('/about', function(req, res){
    res.render('about');
});

module.exports = router;