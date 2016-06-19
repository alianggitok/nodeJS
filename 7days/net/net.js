//通过net模块操作底层socket来搭建一个简单的http服务
var net=require('net'),
	requestTimes=0;

net.createServer(function(connect){
	var responseHeaders=[
			'HTTP/1.1 200 OK',
			'Content-Type: text/plain',
			'Content-Length: 8',//与body的长度一致
			'\n'//依照规则，必须与body间有一个空行相隔
		],
		responseBody='somthing',
		responseContent=responseHeaders.join('\n')+responseBody;
	
	
	connect.on('data', function (data) {
		console.log('request time:',requestTimes+=1);//请求计数
		connect.write(responseContent);//返回response
	});
}).listen(8124);
