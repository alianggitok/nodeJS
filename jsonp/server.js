//TODO
var http=require('http');

http.createServer(function(req,res){
//	var json='{'+
//		'a:1,'+
//		'b:2'+
//	'}';
	var json={
		a:1,
		b:2
	};
	json=JSON.parse(json)
	res.writeHead(200,{
		'Content-Type':'text/plain'
	});
	res.write(json);
	res.end();
	
	
}).listen(8123);