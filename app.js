const express = require('express');
const path = require('path');
const db = require('./config/database');
const Article = require('./models/article');
const methodOverride = require('method-override');
const sass = require('node-sass');


// Initialise express
const app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
// View engine
app.set('view engine', 'pug');
// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override
app.use(methodOverride('_method'));

// Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Routes
app.get('/', (req, res) => res.redirect('/articles'));

app.get('/articles', (req, res) => {
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

app.post('/articles', (req, res) => {
    Article.create({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    }, (err, data) => {
        if (err) console.log(err);
        res.redirect('/');
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});