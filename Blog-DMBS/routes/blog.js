const express = require('express');

const db = require('../data/database')

const router = express.Router();

router.get('/', function(req, res){
    res.redirect('/posts');
});

router.get('/posts', async function(req, res){
    const query = `SELECT posts.*, authors.name AS author_name
        FROM posts INNER JOIN authors 
        ON posts.author_id = authors.id`;
    const [posts] = await db.query(query);
    // console.log(posts);
    res.render('posts-list', {posts: posts});
});

router.get('/new-post', async function(req, res){
    const [authors] = await db.query('SELECT * FROM authors'); // async operation
    // console.log(authors);
    res.render('create-post', {authors, authors});
});

router.post('/posts', async function(req, res){
    const data = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ];
    const query = `INSERT INTO posts 
        (title, summary, body, author_id)
        VALUES (?)`;
    await db.query(query, [data]);
    res.redirect('/posts');
});

router.get('/posts/:pId', async function(req, res){
    const pId = req.params.pId;
    // console.log('pID in url: ', pId);
    const query = `SELECT posts.*, authors.name AS author_name, authors.email as author_email
        FROM posts INNER JOIN authors 
        ON posts.author_id = authors.id
        WHERE posts.id = ?`;

    const [posts] = await db.query(query, pId);

    if(!posts || posts.length === 0) {
        return res.status(404).render('404');
    }

    const postData = {
        ...posts[0],
        date: posts[0].date.toISOString(), // standard machine readable representation
        humanReadableDate: posts[0].date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };

    res.render('post-detail', {post: postData})
});

router.get('/posts/:pId/edit', async function(req, res){
    const query = `
        SELECT * FROM posts
        WHERE id = ?
    `;
    const [posts] = await db.query(query, [req.params.pId]);

    if(!posts || posts.length === 0){
        return res.status(404).render('404');
    }

    res.render('update-post', { post: posts[0] });
});

router.post('/posts/:pId/edit', async function(req, res){
    const query = `
        UPDATE posts
        SET title = ?, summary = ?, body = ?
        WHERE id = ?;
    `;

    await db.query(query, [req.body.title, req.body.summary, req.body.content, req.params.pId]);

    res.redirect('/posts');
});

router.post('/posts/:pId/delete', async function(req, res){
    const query = `
        DELETE FROM posts
        WHERE id = ?;
    `;

    await db.query(query, [req.params.pId]);

    res.redirect('/posts');
});

module.exports = router;