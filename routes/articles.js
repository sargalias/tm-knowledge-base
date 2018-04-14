const router = require('express').Router();
const articlesController = require('../controllers/articles');


router.get('/', articlesController.listArticles);

router.get('/new', articlesController.newArticle);

router.post('/', articlesController.createArticle);

router.get('/:id', articlesController.showArticle);

router.get('/:id/edit', articlesController.editArticle);

router.put('/:id', articlesController.updateArticle);

router.delete('/:id', articlesController.deleteArticle);

module.exports = router;
