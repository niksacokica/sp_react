var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'comments': [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
	'likes' : [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	'date' : Date
});

module.exports = mongoose.model('post', postSchema);
