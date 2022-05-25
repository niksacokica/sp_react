var CommentModel = require('../models/CommentModel.js');
var PostModel = require('../models/postModel.js');

module.exports = {
    list: function (req, res) {
        CommentModel.find()
        .populate('postedBy')
        .exec(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comments.',
                    error: err
                });
            }
            var data = [];
            data.comments = comments;
            return res.json(comments);
        });
    },

    show: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    create: function (req, res) {
		console.log(req.body.id);
		
        var comment = new CommentModel({
			content: req.body.content,
			postedBy : req.session.userId
        });

        comment.save(function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }
			
			PostModel.findOne({ _id: req.body.id }, function (err, post) {
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
				
				post.comments.push(comment._id);

				post.save(function (err, post) {
					if (err) {					
						return res.status(500).json({
							message: 'Error when updating post.',
							error: err
						});
					}
					
					comment.populate("postedBy");
					return res.json(comment);
				});
			});
        });
    },

    update: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            comment.content = req.body.content ? req.body.content : comment.content;
			
            comment.save(function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comment.',
                        error: err
                    });
                }

                return res.json(comment);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;

        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
