var async=require('async');

function sleep(callback,ms){
	var start=new Date().getTime();
	while(new Date().getTime()<(start+ms)){}//这可以阻塞整个进程
	callback();
}

async.parallel({//并行，其中的元素不需要互相依赖时可以用这种方法
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
},function(error,result){//当a、b都执行完会执行这里的回调
	console.log(error,result);
});


