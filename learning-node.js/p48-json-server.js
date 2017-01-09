var http=require('http'),
	fs=require('fs'),
	url=require('url');

function loadDir(dir,callback){
	fs.readdir(dir,function(err,files){
		if(err){
			callback(err);
			return;
		}
		callback(null,files);
	});
}

http.createServer(function(req,res){
	var query=url.parse(req.url,true).query,
		code=null,
		msg={};

	console.log(req.method,req.url,query);
	
	req.on('readable',function(){
		console.log('readable:',req.read());
	});
	req.on('end',function(){
		console.log('request end');
		console.log('=======================');
	});

	loadDir('albums',function(err,files){
		if(err){
			code=503;
			msg=err;
		}else{
			code=200;
			msg={
				error:null,
				data:{
					albums:files
				}
			};
		}
		res.writeHead(code,{
			'Content-Type':'application/json'
		});
		res.write(JSON.stringify(msg));
		res.end();
	});

}).listen(8124);

console.log(module);
