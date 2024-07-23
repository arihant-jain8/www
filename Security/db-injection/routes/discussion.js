const express = require('express');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/discussion');
});

router.get('/discussion', async function (req, res) {
  let filter = '';

  if (req.query.author) {
    // wrong approach
    // filter = `WHERE author = "${req.query.author}"`; // Ari"; DROP TABLE comments; SELECT * FROM comments WHERE author = "BOB
    // so instead of using ^ for making queries to your dataset
    // just use '?' approach
    // sql injection is so common that the sql package has in built sanitization

    // right approach
    filter = `WHERE author = ?`;
  }

  const query = `SELECT * FROM comments ${filter}`; 
  
  console.log(query);

  const [comments] = await db.query(query, [req.body.author]);

  res.render('discussion', { comments: comments });
});

router.post('/discussion/comment', async function (req, res) {

  await db.query('INSERT INTO comments (author, text) VALUES (?)', [[req.body.name, req.body.comment]])

  res.redirect('/discussion');
});

module.exports = router;
