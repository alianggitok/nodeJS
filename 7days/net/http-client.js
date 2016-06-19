
var http=require('http'),
	options={
		hostname:'www.baidu.com',
		port:80,
		path:'/',
		method:'GET',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	},
	//如下 request 相当于 http.get(url,callback) 的实现
	request=http.request(options,function(response){
		var body=[];
		console.log(response.statusCode,response.headers);
		
		response.on('data',function(chunk){
			body.push(chunk);
		});
		
		response.on('end',function(){
			body=Buffer.concat(body);
			console.log(body.toString());
		});
		
	});

request.end();//结束请求
