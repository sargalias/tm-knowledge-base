const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    body: {type: String, required: true}
});

module.exports = mongoose.model('Article', articleSchema);