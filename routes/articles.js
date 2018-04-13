const router = require('express').Router();
const articlesController = require('../controllers/articles');


router.get('/', articlesController.listArticles);

router.get('/new', articlesController.newArticle);

router.post('/', articlesController.createArticle);

router.get('/:id', articlesController.showArticle);

module.exports = router;
