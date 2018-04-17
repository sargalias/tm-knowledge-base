const router = require('express').Router();
const articlesController = require('../controllers/articles');
const passport = require('passport');


router.get('/', articlesController.listArticles);

router.get('/new', ensureLoggedIn, articlesController.newArticle);

router.post('/', ensureLoggedIn, articlesController.articleValidationChain, articlesController.createArticle);

router.get('/:id', articlesController.showArticle);

router.get('/:id/edit', articlesController.editArticle);

router.put('/:id', articlesController.articleValidationChain, articlesController.updateArticle);

router.delete('/:id', articlesController.deleteArticle);

module.exports = router;


function ensureLoggedIn(req, res, next) {
    if (!req.user) {
        req.flash('alert', 'You must be logged in to create an article.');
        return res.redirect('/login');
    }
    next();
}
