var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var spiderSchema = new Schema({
	name : String,
	title : String,
	url : String,
	time :String
});


exports.spiders = mongoose.model('spiders',spiderSchema);
