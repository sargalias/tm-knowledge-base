const router = require('express').Router();
const articlesController = require('../controllers/articles');


router.get('/', articlesController.listArticles);

router.get('/new', articlesController.newArticle);

router.post('/', articlesController.createArticle);

module.exports = router;
