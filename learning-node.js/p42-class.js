var fs=require('fs');

function FileObj(){
	this.filename='';
	this.fileExists=function(callback){
		var _self=this;
		//fs.open()虽然不会跳出当前作用域，但却是异步执行的，
		//重点，将this指针指向的对象存入到一个变量中（内存中），于是即使接下来的异步操作依然可以获取到该对象，
		//不这样做会无法关联到this从而导致filename值为undefined
		
		console.log('About to open: '+_self.filename);
		
		fs.open(_self.filename,'r',function(err,handle){
			if(err){
				console.log('Can\'t open: '+_self.filename);
				callback(err);
				return;
			}
			fs.close(handle,function(){
				console.log(_self.filename+' closed.');
			});
			callback(null,true);
		});
		
	};
}


var fo=new FileObj();
//fo.filename='file.txt';
fo.filename='nothing';

fo.fileExists(function(err){
	if(err){
		console.log('Aw, bummer: '+JSON.stringify(err));
		return;
	}
	console.log('file exists!');
});
