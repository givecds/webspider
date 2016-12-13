var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var spiderSchema = new Schema({
	name : String,
	title : String,
	time : {
		date: Date,
		year: String,
		month: String,
		day: String,
		minute: String
	},
	post : String
});


exports.spiders = mongoose.model('spiders',spiderSchema);
