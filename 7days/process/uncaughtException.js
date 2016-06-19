//捕捉全局异常的方法
process.on('uncaughtException',function(err){
	console.log('Error: %s',err.message);
});

setTimeout(function(fn){
	fn();
},3000);
