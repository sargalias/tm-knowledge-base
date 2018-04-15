const Article = require('../models/article');
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');


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
        if (err) {
            console.log(err);
            req.flash('alert', 'Failed to create article.');
        } else {
            req.flash('success', 'Article added.');
        }
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
            {title: article.title, article: article}
        );
    });
};

module.exports.editArticle = (req, res) => {
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
        res.render('articles/edit', {
            title: 'Edit Article',
            article: article
        });
    });
};

module.exports.updateArticle = (req, res) => {
    modifiedArticle = {
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    };
    Article.findByIdAndUpdate(req.params.id, modifiedArticle, (err, article) => {
        if (err) {
            req.flash('alert', 'Failed to update article.');
            res.send(err);
            return;
        }
        req.flash('success', 'Article updated.');
        res.redirect('/articles');
    });
};

module.exports.deleteArticle = (req, res) => {
    Article.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            req.flash('alert', 'Failed to delete article.');
            res.send(err);
            return;
        }
        req.flash('success', 'Article deleted.');
        res.send('Article deleted.');
    })
};


module.exports.articleValidationChain = [
    // Validate
    body('title', 'Title is required.').trim().isLength({min: 1}),
    body('author', 'Author is required.').trim().isLength({min: 1}),
    body('body', 'Body is required.').trim().isLength({min:1}),
    // Sanitize
    sanitizeBody('title').trim().escape(),
    sanitizeBody('author').trim().escape(),
    sanitizeBody('body').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const article = matchedData(req);
        if (!errors.isEmpty()) {
            // Render template with errors and information?
            res.render('articles/new', {title: 'Create article', errors: errors.array(), article: article});
            return;
        }
        next();
    }
];
