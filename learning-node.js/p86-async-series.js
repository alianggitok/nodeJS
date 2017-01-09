var async=require('async');

function sleep(callback,ms){
	var start=new Date().getTime();
	while(new Date().getTime()<(start+ms)){}//这可以阻塞整个进程
	callback();
}

async.series({//串行，与waterfall不同的是，各元素的结果都会在最终结果中列出
	a:function(callback){
		setTimeout(function(){
			callback(null,'A');
		},1000);
	},
	b:function(callback){
		setTimeout(function(){
			callback(null,'B');
		},3000);
	}
},function(error,result){//只有当a、b都执行完才会执行这里的回调
	console.log(error,result);
});


async.series([//或者传入数组，最终结果会是由各元素执行结果组成的数组
	function(callback){
		setTimeout(function(){
			callback(null,'A');
		},1000);
	},
	function(callback){
		setTimeout(function(){
			callback(null,'B');
		},3000);
	}
],function(error,result){//只有当a、b都执行完才会执行这里的回调
	console.log(error,result);
});

