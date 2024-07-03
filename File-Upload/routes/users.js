const express = require('express');
const multer = require('multer');

const db = require('../data/database');

// multer automatically stores our file for us
// middleware to handle file uploads
// const upload = multer({ dest: 'images' }); // it gives a way to store the uploaded files
// we store the use data in the database and user files in the hard drive
// and we provide the path to the user files to the database and not store the user files on the database
// with dest:'images' we cannot retain the extension of file
// with storage - we can define path as well as the type of the file
const storageConfig = multer.diskStorage({
    destination: function(req, file, cb){ // incoming req, file and callback fn that we have to execute once we arrive at the destination
        // v multer will give us this function
        cb(null, 'images'); //1st parameter -> potential error in arriving the destination  2nd parameter -> destination
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname); // 2nd param - how to name the file
    }
});

const upload = multer({storage: storageConfig});
const router = express.Router();

router.get('/', async function(req, res) {
    const users = await db.getDb().collection('users').find().toArray();
    res.render('profiles', {users: users});
});

router.get('/new-user', function(req, res) {
    res.render('new-user');
});

// we can add many middlewares to the same req
// middle to read file from the input is called before rendering the final output
// single('<name of the input field>') - because we are expecting a single file upload
router.post('/profiles', upload.single('image'), async function(req, res){
    const uploadedImg = req.file; // given by multer
    const userData = req.body; 

    console.log(uploadedImg);
    console.log(userData);

    await db.getDb().collection('users').insertOne({
        nmae: userData.username,
        imagePath: uploadedImg.path // from multer object
    });

    res.redirect('/');
});

module.exports = router;