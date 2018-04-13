const router = require('express').Router();
const Article = require('../models/article');


router.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        }
        res.render('articles/index', {title: 'Articles', articles: articles});
    });
});

router.get('/new', (req, res) => {
    res.render('articles/new', {title: 'New Article'});
});

router.post('/', (req, res) => {
    Article.create({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    }, (err, data) => {
        if (err) console.log(err);
        res.redirect('/');
    });
});

module.exports = router;
