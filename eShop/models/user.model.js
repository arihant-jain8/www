const bcrypt = require('bcryptjs');

const db = require('../data/database');


class User{
    constructor(email, password, fullname, street, postal, city){
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postal: postal,
            city: city
        };
    }

    async signup(){
        const hashedPass = await bcrypt.hash(this.password, 12);
        
        await db.getDb().collection('users').insertOne({ 
            email: this.email,
            password: this.hashedPass,
            name: this.name,
            address: this.address
        });
    }

    getUserWithEmail(){
        return db.getDb().collection('users').findOne({ email: this.email });
    }

    isPassEqual(hashedPass){
        return bcrypt.compare(this.password, hashedPass);
    }
}

module.exports = User;