const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// this middleware is not able to handle file uploads
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/images', express.static('images')); // so that images can directly be accessible by the visitors
// first parameter is a path filter -> middleware will be active only when this path is found
// they cannot delete or edit it

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(6969);
});
