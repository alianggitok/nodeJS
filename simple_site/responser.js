var cp=require('child_process'),
	qs=require('querystring'),
	fs=require('fs'),
	formidable=require('formidable'),
	path=require('path');

function handle(req,res,mime){
	function loadHTML(file){

		console.log('load html:',file);

		fs.exists(file,function(exist){
			if(exist){
				var resStream=fs.createReadStream(file),
					data,
					html;
				res.writeHead(200,{
					'Content-Type':mime.types.html
				});
				// resStream.on('readable',function(){
				// 	data=resStream.read();
				// 	if(data){
				// 		res.write(data.toString('utf8'));
				// 	}
				// });
				resStream.on('error',function(err){
					res.writeHead(500,{
						'Content-Type':mime.types.json
					});
					console.log(err);
					res.end(JSON.stringify({
						error:'error!',
						message:err
					}));
				});
				resStream.pipe(res);
				// resStream.on('end',function(){
				// 	res.end();
				// });
			}else{
				res.writeHead(404,{
					'Content-Type':mime.types.json
				});
				console.log('file not find');
				res.end(JSON.stringify({
					error:'error!',
					message:'file not find'
				}));
			}
		});

	}
	
	return {
		index:function(){
			loadHTML('./view/index.html');
		},
		start:function(){
			res.writeHead(200,{
				'Content-Type':'text/plain'
			});
			res.write('we will rock');
			res.end();
		},
		sleep:function(){//阻塞案例
			res.writeHead(200,{
				'Content-Type':'text/plain'
			});
			console.log('sleeping...');
			(function sleep(ms){
				var start=new Date().getTime();
				while(new Date().getTime()<(start+ms)){}
			}(5000));//“睡”5秒，这会阻塞整个进程
			console.log('sleep end');
			res.write('done!');
			res.end();
		},
		dir:function(){
			cp.exec('dir',function(err,stdout,stderr){//运行windows的dir命令，异步回调
				console.log(stdout);
				res.writeHead(200,{
					'Content-Type':'text/plain'
				});
				res.write(stdout);
				res.end();
			});
		},
		form:function(){
			loadHTML('./view/form.html');
		},
		formResult:function(){
			var form=new formidable.IncomingForm(),
				html='';
			form.parse(req,function(err,fields,files){
				json={
					text:fields.text
				};
				res.writeHead(200,{
					'Content-Type':mime.types.json
				});
				res.write(JSON.stringify(json));
				res.end();
			});
		},
		upload:function(){
			loadHTML('./view/upload.html');
		},
		uploadResult:function(){
			var form=new formidable.IncomingForm(),
				html='',
				holderHTML='',
				dir='./upload/';
			
            console.log(req.files);
            
			form.encoding='utf-8';
			form.uploadDir=dir;
			form.parse(req,function(err,fields,files){
				var ext=path.extname(files.file.name),
					newName=dir+'temp'+ext,
					fileUrl=newName;
				
				fs.renameSync(files.file.path, newName);//将刚上传的保存在服务端的临时文件重命名，可以用更好的异步方法替代
				
				fs.readFile(fileUrl,'binary',function(err,file){
					if(err){
						console.log('error:',err);
						res.writeHead(500,{
							'Content-Type':'text/plain'
						});
						res.write(err);
						res.end();
					}else{
						if(/.(png|jpg|gif)$/.test(ext)){
							holderHTML='<p>image: <img src="'+fileUrl+'"></p>';
						}else if(/.(txt)$/.test(ext)){
							holderHTML='<p>'+file.toString()+'</p>';
						}else{
							holderHTML='file uploaded success!';
						}
					}
					html=''+
						'<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
							'<title>Untitled Document</title>'+
							'<meta charset="UTF-8">'+
							'<meta name="description" content="" />'+
							'<meta name="keywords" content="" />'+
						'</head>'+
						'<body>'+
							holderHTML+
						'</body>'+
						'</html>';

					res.writeHead(200,{
						'Content-Type':'text/html'
					});
					res.write(html);
					res.end();
				});
			});

		},
		others:function(){//可以考虑放在router层处理
			var pathname=req.url,
				ext=path.extname(pathname),
				hasMIME=mime.types[ext.replace('.','')];
			
			if(hasMIME){
				fs.readFile('.'+pathname,'binary',function(err,file){
					if(err){
						console.log('error:',err);
						res.writeHead(500,{
							'Content-Type':'text/plain'
						});
						res.write(err);
						res.end();
					}else{
						res.writeHead(200,{
							'Content-Type':'text/plain'
						});
						res.write(file,'binary');
						res.end();
					}
				});
			}else{
				console.log('the asset not allow to request');
				res.writeHead(200,{
					'Content-Type':'text/plain'
				});
				res.write('what sould i do?');
				res.end();
			}
		}
	};
}

exports.handle=handle;
