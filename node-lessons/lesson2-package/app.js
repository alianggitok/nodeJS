// http://localhost:3000/?q=warren

var express=require('express'),
	 utility=require('utility'),
	 app=express();

app.get('/',function(req,res){
	var q=req.query.q,
		 md5=utility.md5(q),
		 sha1=utility.sha1(q);
	
	res.send('md5: '+md5+'<br>sha1: '+sha1);
});

app.listen(3000,function(req,res){
	console.log('app is running at port 3000');
});
