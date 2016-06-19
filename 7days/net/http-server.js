var http=require('http');

var server=http.createServer(function(request,response){
	var body=[];
	
	console.log(request.url);//获取发起请求的url
	console.log(request.method);
	
	request.on('data',function(chunk){
		body.push(chunk);
	});
	
	request.on('end',function(){
		body=Buffer.concat(body);
		console.log(body.toString());
	});
	
	
	response.writeHead(200,{
		'Content-Type':'text/html'
	});
	response.end('Hello World\n');
	
});

server.listen(8124);
