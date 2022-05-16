var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController.js');


router.get('/', commentController.list);

router.get('/:id', commentController.show);

router.post('/', commentController.create);

router.put('/:id', commentController.update);

router.delete('/:id', commentController.remove);

module.exports = router;
