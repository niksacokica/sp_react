var PostModel = require('../models/postModel.js');

module.exports = {
    list: function (req, res) {
        PostModel.find()
        .populate('postedBy')
        .exec(function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }
            var data = [];
            data.posts = posts;
            return res.json(posts);
        });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PostModel.findOne({_id: id}, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }

            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }

            return res.json(post);
        });
    },

    create: function (req, res) {
        var post = new PostModel({
			name : req.body.name,
			path : "/images/"+req.file.filename,
			postedBy : req.session.userId,
			date: Date.now(),
			views : 0,
			likes : 0
        });

        post.save(function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating post',
                    error: err
                });
            }

            return res.status(201).json(post);
        });
    },

    update: function (req, res) {
        var id = req.params.id;

        PostModel.findOne({_id: id}, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post',
                    error: err
                });
            }

            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }

            post.name = req.body.name ? req.body.name : post.name;
			post.path = req.body.path ? req.body.path : post.path;
			post.postedBy = req.body.postedBy ? req.body.postedBy : post.postedBy;
			post.views = req.body.views ? req.body.views : post.views;
			post.likes = req.body.likes ? req.body.likes : post.likes;
			
            post.save(function (err, post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating post.',
                        error: err
                    });
                }

                return res.json(post);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;

        PostModel.findByIdAndRemove(id, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the post.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function(req, res){
        return res.render('post/publish');
    }
};
