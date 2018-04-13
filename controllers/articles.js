const Article = require('../models/article');

module.exports.listArticles = (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        }
        res.render('articles/index', {title: 'Articles', articles: articles});
    });
};

module.exports.newArticle = (req, res) => {
    res.render('articles/new', {title: 'New Article'});
};

module.exports.createArticle = (req, res) => {
    Article.create({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    }, (err, data) => {
        if (err) console.log(err);
        res.redirect('/');
    });
};

module.exports.showArticle = (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            res.send(err);
            return;
        }
        if (article === null) {
            err = new Error('Article not found.');
            err.statusCode = 404;
            res.send(err);
            return
        }
        res.render('articles/show',
            {title: `Article ${article.title}`, article: article}
        );
    });
};
