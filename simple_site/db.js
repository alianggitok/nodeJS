var mongoClient=require('mongodb').MongoClient,
	url='mongodb://localhost:27017/simple_site';

MongoClient.connect(url,function(err,db){
	console.log('db server');
});