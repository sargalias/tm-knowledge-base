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
    if (!req.user) {
        req.flash('alert', 'You must first login before creating an article.');
        return res.redirect('/users/login');
    }
    Article.create({
        title: req.body.title,
        author: req.user._id,
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
    Article.findById(req.params.id) .populate('author') .exec((err, article) => {
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
    Article.findById(req.params.id)
        .populate('author')
        .exec((err, article) => {
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
        if (!article.author._id.equals(req.user._id)) {
            req.flash('alert', 'Not authorized.');
            return res.redirect('/articles');
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
    body('body', 'Body is required.').trim().isLength({min:1}),
    // Sanitize
    sanitizeBody('title').trim(),
    sanitizeBody('body').trim(),
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

module.exports.ensureLoggedIn = function(req, res, next) {
    if (!req.user) {
        req.flash('alert', 'You must be logged in.');
        return res.redirect('/users/login');
    }
    next();
}

module.exports.ensureCorrectUser = function(req, res, next) {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            return next(err);
        }
        if (!req.user._id.equals(article.author)) {
            req.flash('alert', 'Not authorized.');
            res.redirect('/articles');
            return;
        }
        next();
    });
}
