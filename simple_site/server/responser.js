/** responser
 * @module
 * @requires server/mime
 * @requires server/config
 * @requires server/util
 * @requires server/db
 */

var fs=require('fs'),
	cp=require('child_process'),
	formidable=require('formidable'),
	path=require('path'),
	mime=require('./mime'),
	config=require('../config'),
	util=require('./util'),
	db=require('./db');


/** 响应处理
 * @param req {object} request from http
 * @param res {object} response from http
 */
function handle(req,res){

	var mimeTypes=mime.types;

	return {
		index:function(){
			util.sendHTML(res,'./view/index.html');
		},
		start:function(){
			util.sendTxt(res,200,'we will rock');
		},
		sleep:function(){//阻塞案例
			console.log('sleeping...');
			(function sleep(ms){
				var start=new Date().getTime();
				while(new Date().getTime()<(start+ms)){}
			}(5000));//“睡”5秒，这会阻塞整个进程
			util.sendTxt(res,200,'wake up!');
			console.log('waked');
		},
		dir:function(){
			cp.exec('dir',function(err,stdout,stderr){//运行windows的dir命令，异步回调
				console.log(stdout);
				util.sendTxt(res,200,stdout);
			});
		},
		form:{
			page:function(){
				util.sendHTML(res,'./view/form.html');
			},
			result:function(){
				var form=new formidable.IncomingForm(),
					html='';
				form.parse(req,function(err,fields,files){
					util.sendJSON(res,200,fields);
				});
			},
		},
		upload:function(){
			util.sendHTML(res,'./view/upload.html');
		},
		uploadResult:function(){
			var form=new formidable.IncomingForm(),
				html='',
				holderHTML='',
				dir='./upload/';
			
            
			form.encoding='utf-8';
			form.uploadDir=dir;
			form.parse(req,function(err,fields,files){
				var ext=path.extname(files.file.name),
					newName=dir+'temp'+ext,
					fileUrl=newName;
            	
				console.log(files);
				
				fs.renameSync(files.file.path, newName);//将刚上传的保存在服务端的临时文件重命名，可以用更好的异步方法替代
				
				fs.readFile(fileUrl,'binary',function(err,file){
					if(err){
						console.log('error:',err);
						util.sendTxt(res,500,err);
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
						'Content-Type':mimeTypes.html
					});
					res.write(html);
					res.end();
				});
			});

		},
		db:{
			page:function(){
				util.sendHTML(res,'./view/db.html');
			},
			find:function(queries){
				var q;
				if(!queries){
					util.sendJSON(res,200,{
						error:{
							name:'NoQueries',
							txt:'not provide quries.'
						}
					});
					return;
				}else{
					q=JSON.parse(queries.q);
					console.log('find queries:',q);
				}

				db.connect(config.db.connectStr,config.db.options,function(db){
					var collection=db.collection('doc');
					collection.find(q).toArray(function(err,docs){
						console.log('found records:',docs);
						util.sendJSON(res,200,{
							error:null,
							result:docs
						});
						db.close();
					});
				});
			},
			insert:function(queries){
				var doc=[];
				if(!queries){
					util.sendJSON(res,200,{
						error:{
							name:'NoQueries',
							txt:'not provide quries.'
						}
					});
					return;
				}else{
					doc.push(JSON.parse(queries.doc));
					console.log('insert document:',doc);
				}

				db.connect(config.db.connectStr,config.db.options,function(db){
					var collection=db.collection('doc');
					collection.insertMany(doc,function(err){
						console.log('insert document:',doc);
						console.log('result:',err)
						util.sendJSON(res,200,{
							error:null,
							result:doc
						});
						db.close();
					});
				});
			}
		},
		others:function(){//可以考虑放在router层处理
			var pathname=req.url,
				ext=path.extname(pathname),
				hasMIME=mimeTypes[ext.replace('.','')];
			
			if(hasMIME){
				fs.readFile('.'+pathname,'binary',function(err,file){
					if(err){
						console.log('error:',err);
						util.sendTxt(res,500,String(err));
					}else{
						res.writeHead(200,{
							'Content-Type':mimeTypes.txt
						});
						res.write(file,'binary');
						res.end();
					}
				});
			}else{
				console.log('the asset not allow to request');
				util.sendTxt(res,200,'what sould i do?');
			}
		}
	};
}

module.exports={
	handle:handle
};
