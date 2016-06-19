/**
一个接受请求，并将请求指向的文件合并
*/

var fs=require('fs'),
	path=require('path'),
	http=require('http');

var MIME={
	'.css':'text/css',
	'.js':'application/javascript'
};

function combineFiles(pathnames,callback){//文件合并的功能函数
	var output=[];
	
	(function next(i,len){
		if(i<len){
			//串行的文件读取方式
			fs.readFile(pathnames[i],function(err,data){
				if(err){
					callback(err);
				}else{
					output.push(data);//生成数组
					next(i+1,len);
				}
			});
		}else{
			callback(null,Buffer.concat(output));//全部读取后，合并output数组内容
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
		port=config.port||90;
	
	http.createServer(function(request,response){
		var urlInfo=parseURL(root,request.url);
		
		combineFiles(urlInfo.pathnames,function(err,data){
			if(err){//文件处理有错误的时候在页面显示错误信息
				console.error(err.message);
				response.writeHead(404);
				response.end(err.message);
			}else{//成功处理文件后在页面显示合并后的内容
				console.log('OK!');
				response.writeHead(200,{
					'Content-Type':urlInfo.mime
				});
				response.end(data);
			}
		});
	}).listen(port);
}

main(process.argv.slice(2));
