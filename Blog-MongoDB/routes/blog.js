const express = require('express');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const db = require('../data/database');

const router = express.Router();

router.get('/', function(req, res) {
	res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
	const posts = await db
		.getDb()
		.collection('posts')
		.find({}, {title: 1, summary: 1, 'author.name': 1})
		.toArray();

  	res.render('posts-list', {posts: posts});
});

router.post('/posts', async function(req, res){
	const authorId = new ObjectId(req.body.author)
	const author  = await db.getDb().collection('authors').findOne({_id: authorId});

	const newPost = {
		title: req.body.title,
		summary: req.body.summary,
		body: req.body.content,
		date: new Date(),
		author: {
			id: authorId,
			name: author.name,
			email: author.email
		}
	};

	const result = await db.getDb().collection('posts').insertOne(newPost);
	// console.log(result);
	res.redirect('/posts');
});

router.get('/new-post', async function(req, res) {
	// collection to access the collection in the db and then apply find query on it
	const authors = await db.getDb().collection('authors').find().toArray(); // returns promise thats why await
	// if we dont use toArray() then it will return a cursor to the authors db

	// console.log(authors);
  	res.render('create-post', {authors: authors});
});

// VIEW SINGLE POST
router.get('/posts/:pId', async function(req, res){
	const pId = req.params.pId;
	console.log(pId);

	const post = await db
		.getDb()
		.collection('posts').
		findOne( { _id: new ObjectId(pId) }, { summary: 0 } );

	if(!post){
		return res.status(404).render('404');
	}

	post.humanReadableDate = post.date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	post.date = post.date.toISOString();
	
	res.render('post-detail', {post: post});
});

//UPDATE POST
router.get('/posts/:pId/edit', async function(req, res){
	const pId = req.params.pId;
	const post = await db
		.getDb()
		.collection('posts').
		findOne( 
			{ _id: new ObjectId(pId) }, 
			{
				title: 1,
				summary: 1,
				body: 1
			}
		);

	if(!post){
		return res.status(404).render('404');
	}

	res.render('update-post', {post: post});
});

router.post('/posts/:pId/edit', async function(req, res){
	const result = await db
		.getDb()
		.collection('posts')
		.updateOne(
			{ _id: new ObjectId(req.params.pId) }, 
			{ 
				$set: {
					title: req.body.title,
					summary: req.body.summary,
					body: req.body.content
				}
			}
		);

	res.redirect('/posts');
});

// DELETE POST
router.post('/posts/:pId/delete', async function(req, res){
	const result = await db
		.getDb()
		.collection('posts')
		.deleteOne( { _id: new ObjectId(req.params.pId) } );

	res.redirect('/posts');
});

module.exports = router;