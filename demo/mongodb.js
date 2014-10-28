var mongo = require('mongodb'),
	host='localhost',
	port=mongo.Connection.DEFAULT_PORT,
	db=new mongo.Db('node-mongo-examples',new mongo.Server(host,port,{}),{});

console.log(db);

db.open(function(err,db){
	db.collection('users',function(err,collection){
		collection.insert({
			username:'Bilbo',
			firstname:'Shilbo'
		},function(err,docs){
			console.log(docs);
			db.close();
		});
	});
});

