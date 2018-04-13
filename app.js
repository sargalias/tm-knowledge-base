const express = require('express');
const path = require('path');
const db = require('./config/database');
const Article = require('./models/article');


const app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
// View engine
app.set('view engine', 'pug');



// Routes
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        }
        res.render('articles/index', {title: 'Articles', articles: articles});
    });
});

app.get('/articles/new', (req, res) => {
    res.render('articles/new', {title: 'New Article'});
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});