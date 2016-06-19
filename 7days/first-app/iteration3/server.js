var fs=require('fs'),
	path=require('path'),
	http=require('http');

var MIME={
	'.css':'text/css',
	'.js':'application/javascript'
};

function validate(pathnames,callback){
	(function next(i,len){
		if(i<len){
			console.log(pathnames[i]+' validating...');
			fs.stat(pathnames[i],function(err,stats){
				if(err){
					callback(err);
				}else if(!stats.isFile()){
					callback(new Error());
				}else{
					next(i+1,len);
				}
			});
		}else{
			callback(null,pathnames);
		}
	}(0,pathnames.length));
}

function output(pathnames,writer){
	//利用事件响应，流式地读取文件
	(function next(i,len){
		if(i<len){
			var reader=fs.createReadStream(pathnames[i]);
			reader.pipe(writer,{end:false});
			reader.on('data',function(){
				console.log(pathnames[i]+' loading...');
			});
			reader.on('end',function(){
				next(i+1,len);
			});
		}else{
			writer.end();
		}
	}(0,pathnames.length));
}

function parseURL(root,url){
	var base,pathnames,parts;
	if(url.indexOf('??')===-1){
		url=url.replace('/','??');
	}
	
	parts=url.split('??');
	base=parts[0];
	pathnames=parts[1].split(',').map(function(value){
		return path.join(root,base,value);
	});
	
	return{
		mime:MIME[path.extname(pathnames[0])]||'text/plain',
		pathnames:pathnames
	};
}

function main(argv){
	var config=JSON.parse(fs.readFileSync(argv[0],'utf-8')),
		root=config.root||'.',
		port=config.port||90,
		requestTimes=0,
		server;
	
	server=http.createServer(function(request,response){
		console.log('===================== request times: '+(requestTimes+=1)+' =====================');
		var urlInfo=parseURL(root,request.url);
		//首先验证文件
		validate(urlInfo.pathnames,function(err,pathnames){
			if(err){//如果文件验证失败则输出错误信息
				console.log(err.message);
				response.writeHead(404);
				response.end(err.message);
			}else{//如果通过验证，则读取文件并输出
				response.writeHead(200,{
					'Content-Type':urlInfo.mime
				});
				output(pathnames,response);
			}
		});
		
	}).listen(port);
	
	process.on('SIGTERM',function(){
		server.close(function(){//当进程终结时关闭服务
			process.exit(0);//设置状态码
		});
	});
}

main(process.argv.slice(2));
