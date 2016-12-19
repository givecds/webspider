var express = require('express');
var router = express.Router();
var spiders = require('../module/db').spiders;
var crypto = require('crypto');
var list = require('../update/list')

var newList=spiders.find({'name':'project'},function(err,docs){
	console.log(err||docs);
	return docs;
})

/* GET home page. */
// router.get('/', function(req, res, next) {
// 	console.log(newList);
//   res.render('index', { 
//   	title: 'webSpider', 
//   	articleList: [],
//   	articleurl: "1",
//   	articletitle: "1"
//   });
// });



module.exports = router;
