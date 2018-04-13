const mongoose = require('mongoose');

// MONGODB_URI
let MONGODB_URI;
if (process.env.NODE_ENV === 'production') {
    MONGODB_URI = require('./database-prod')['MONGODB_URI'];
} else {
    MONGODB_URI = require('./database-dev')['MONGODB_URI'];
}

// Connect and initialise
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


module.exports = {db: db};