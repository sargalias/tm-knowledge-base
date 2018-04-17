const router = require('express').Router();
const ac = require('../controllers/articles');
const passport = require('passport');


router.get('/', ac.listArticles);

router.get('/new', ac.ensureLoggedIn, ac.newArticle);

router.post('/', ac.ensureLoggedIn, ac.articleValidationChain, ac.createArticle);

router.get('/:id', ac.showArticle);

router.get('/:id/edit',ac.ensureLoggedIn, ac.ensureCorrectUser, ac.editArticle);

router.put('/:id', ac.ensureLoggedIn, ac.ensureCorrectUser, ac.articleValidationChain, ac.updateArticle);

router.delete('/:id', ac.ensureLoggedIn, ac.ensureCorrectUser, ac.deleteArticle);

module.exports = router;
