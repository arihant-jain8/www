// dealing with posts
const mongodb = require('mongodb');

const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

class Post{
    constructor(title, content, id){
        this.title = title;
        this.content = content;
        if(id){
            this.id = new ObjectId(id);
        }
    }

    static async fetchAll(){
        const posts = await db.getDb().collection('posts').find().toArray();
        return posts;
    }

    async fetch(){ // fetching single
        if(!this.id){
            return;
        }
        
        const postDoc = await db
            .getDb()
            .collection('posts')
            .findOne({ _id: this.id });
        this.title = postDoc.title;
        this.content = postDoc.content;
    }

    async save(){ 
        let result;

        if(this.id){ // if id exists then we are updating the post
            result = await db
                .getDb()
                .collection('posts')
                .updateOne(
                { _id: this.id },
                { $set: { title: this.title, content: this.content } }
            );
        } else{ // else we are saving the post
            result = await db.getDb().collection('posts').insertOne({
                title: this.title,
                content: this.content,
            });       
        }

        return result;
    }

    async delete(){
        if(!this.id){
            return;
        }
        const result = await db.getDb().collection('posts').deleteOne({ _id: this.id });
        return result;
    }
}

module.exports = Post;