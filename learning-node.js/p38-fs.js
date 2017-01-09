var fs=require('fs'),
	buff=new Buffer(100000);

fs.open('file.txt','r',function(err,handle){
	console.log(err,handle);
	if(err){
		console.log('error!');
		return;
	}
	fs.read(handle,buff,0,100000,null,function(err,length){
		console.log(buff.toString('utf-8',0,length));
		if(err){
			console.log('error!');
			return;
		}
		fs.close(handle,function(){
			console.log('closed.');
		});
	});
});
