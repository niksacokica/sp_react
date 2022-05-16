var express = require('express');

var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var postController = require('../controllers/postController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', postController.list);

router.get('/:id', postController.show);

router.post('/', requiresLogin, upload.single('image'), postController.create);

router.post('/:id', postController.like);

router.put('/:id', postController.update);

router.delete('/:id', postController.remove);

module.exports = router;
