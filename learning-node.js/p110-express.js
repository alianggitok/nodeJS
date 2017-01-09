var express=require('express'),
    app=express();

app.get('/',function(req,res){
	res.end('hello world!');
});

app.listen(8124);
