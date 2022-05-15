var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'date' : Date,
	'views' : Number,
	'likes' : Number
});

module.exports = mongoose.model('post', postSchema);
