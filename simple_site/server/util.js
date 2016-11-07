/** 工具集
 * @module
 * @requires server/mime
 */
var fs=require('fs'),
	mime=require('./mime');

var mimeTypes=mime.types;

/** 发送html到前端
 * @param res {object} response object from http
 * @param file {string} path of the file
 * @example
 * util.sendHTML(res,'./view/index.html');
 */
function sendHTML(res,file){
	console.log('load html:',file);

	fs.exists(file,function(exist){
		if(exist){
			var resStream=fs.createReadStream(file),
				data,
				html;
			res.writeHead(200,{
				'Content-Type':mimeTypes.html
			});
			// resStream.on('readable',function(){
			// 	data=resStream.read();
			// 	if(data){
			// 		res.write(data.toString('utf8'));
			// 	}
			// });
			resStream.on('error',function(err){
				res.writeHead(500,{
					'Content-Type':mimeTypes.json
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
				'Content-Type':mimeTypes.json
			});
			console.log('file not find');
			res.end(JSON.stringify({
				error:'error!',
				message:'file not find'
			}));
		}
	});

}

/** 发送JSON到前端
 * @param res {object} response object from http
 * @param doc {object} will be transform to string 
 * @example
 * util.sendJSON(res,{
 * 	error:null,
 * 	result:'OK!'
 * });
 */
function sendJSON(res,code,doc){
	res.writeHead(code,{
		'Content-Type':mimeTypes.json
	});
	
	res.write(JSON.stringify(doc));
	res.end();
}

/** 发送字符串到前端
 * @param res {object} response object from http
 * @param str {string} content will be send
 * @example
 * util.sendTxt(res,'welcome!');
 */
function sendTxt(res,code,str){
	res.writeHead(code,{
		'Content-Type':mimeTypes.txt
	});
	
	res.write(str);
	res.end();
}



module.exports={
	sendHTML:sendHTML,
	sendJSON:sendJSON,
	sendTxt:sendTxt
}