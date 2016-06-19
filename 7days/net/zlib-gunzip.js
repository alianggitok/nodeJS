var zlib=require('zlib'),
	http=require('http'),
	options={
		hostname:'www.baidu.com',
		port:80,
		path:'/',
		method:'GET',
		headers:{
			'Accept-Encoding':'gzip,deflate'
		}
	},
	request=http.request(options,function(response){//发送一个允许返回gzip的请求
		var body=[];
		console.log(response.statusCode);

		response.on('data',function(chunk){
			body.push(chunk);
		});

		response.on('end',function(){
			body=Buffer.concat(body);

			if(response.headers['content-encoding']==='gzip'){
				//如果响应体内容是gzip压缩后的，则解压后输出
				zlib.gunzip(body,function(err,data){
					console.log(data.toString());
				});
			}else{
				//否则原样输出
				console.log(body.toString());
			}
		});

	});

request.end();
