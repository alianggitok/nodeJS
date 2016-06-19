var zlib=require('zlib'),
	http=require('http');

http.createServer(function(request,response){
	var i=1024,
		data='';
	while(i--){
		data+=' ';//mock一段1KB大小的需要gzip压缩的字符串（一个空格就是一个字节）
	}
	
	function isGzip(){
		//从请求头信息检索gzip，
		//注意头信息的字段是小写，因为不同服务端、客户端并不严格遵照驼峰命名规范，无奈
		var gzip=(request.headers['accept-encoding']||'').indexOf('gzip');
		console.log('gizp:',gzip);
		if(gzip<0){
			return false;
		}else{
			return true;
		}
	}
	
	if(isGzip()){//如果客户端的请求要求gzip，则使用zlib模块对响应体做压缩
		zlib.gzip(data,function(err,data){
			response.writeHead(200,{
				'Content-Type':'text/html',
				'Content-Encoding':'gzip'
			});
			response.end(data);
		});
	}else{//否则正常的返回响应
		response.writeHead(200,{
			'Content-Type':'text/html',
		});
		response.end(data);
	}
	
	//可以从 chrome浏览器的调试工具network中看到压缩后的差异从1.0kb缩小到197b
	
}).listen(8124);
