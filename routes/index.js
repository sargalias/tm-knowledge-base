const router = require('express').Router();

router.get('/', (req, res) => res.redirect('/articles'));

module.exports = router;
