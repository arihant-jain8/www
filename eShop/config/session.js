const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore(){
    const MongoDBStore = mongoDbStore(expressSession);

    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'eShop',
        collection: 'session'
    });

    return store;
}

function createSessionConfig(){
    return {
        secret: 'ohmygodsecret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = createSessionConfig;