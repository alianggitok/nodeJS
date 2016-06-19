var cp=require('child_process'),
	qs=require('querystring'),
	fs=require('fs'),
	formidable=require('formidable'),
	path=require('path');

function handle(req,res,mime){
	
	return {
		index:function(){
			var html=''+
				'<!DOCTYPE html>'+
				'<html>'+
				'<head>'+
					'<title>Untitled Document</title>'+
					'<meta charset="UTF-8">'+
					'<meta name="description" content="" />'+
					'<meta name="keywords" content="" />'+
				'</head>'+
				'<body>'+
					'<h3>welcome</h3>'+
					'<a href="/start">start</a><br>'+
					'<a href="/sleep">sleep</a><br>'+
					'<a href="/dir">dir</a><br>'+
					'<a href="/form">form</a><br>'+
					'<a href="/upload">upload</a><br>'+
					'<a href="/404">404</a>'+
				'</body>'+
				'</html>';
			res.writeHead(200,{
				'Content-Type':'text/html'
			});
			res.write(html);
			res.end();
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
			}(10000));//“睡”10秒，这会阻塞整个进程
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
			var html=''+
				'<!DOCTYPE html>'+
				'<html>'+
				'<head>'+
					'<title>Untitled Document</title>'+
					'<meta charset="UTF-8">'+
					'<meta name="description" content="" />'+
					'<meta name="keywords" content="" />'+
				'</head>'+
				'<body>'+
					'<form action="/submitResult" method="post">'+
						'<textarea name="text" rows="20" cols="60"></textarea><br/>'+
						'<input type="submit" value="Submit"/>'+
					'</form>'+
				'</body>'+
				'</html>';
			
			res.writeHead(200,{
				'Content-Type':'text/html'
			});
			res.write(html);
			res.end();
		},
		submitResult:function(){
			var form=new formidable.IncomingForm(),
				html='';
			form.parse(req,function(err,fields,files){
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
						'<p>text: '+fields.text+'</p>'+
					'</body>'+
					'</html>';
				res.writeHead(200,{
					'Content-Type':'text/html'
				});
				res.write(html);
				res.end();
			});
		},
		upload:function(){
			var html=''+
				'<!DOCTYPE html>'+
				'<html>'+
				'<head>'+
					'<title>Untitled Document</title>'+
					'<meta charset="UTF-8">'+
					'<meta name="description" content="" />'+
					'<meta name="keywords" content="" />'+
				'</head>'+
				'<body>'+
					'<form action="/uploadResult" enctype="multipart/form-data" method="post">'+
						'<input type="file" name="file"><br/>'+
						'<input type="submit" value="Submit"/>'+
					'</form>'+
				'</body>'+
				'</html>';
			
			res.writeHead(200,{
				'Content-Type':'text/html'
			});
			res.write(html);
			res.end();
		},
		uploadResult:function(){
			var form=new formidable.IncomingForm(),
				html='',
				holderHTML='',
				dir='./upload/';
			
			form.encoding = 'utf-8';
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
