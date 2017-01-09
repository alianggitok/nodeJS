var async=require('async');

function sleep(callback,ms){
	var start=new Date().getTime();
	while(new Date().getTime()<(start+ms)){}//这可以阻塞整个进程
	callback();
}

async.auto({//可以传入对象，这样就可以指定key了
	a:function(callback){
		sleep(function(){
			console.log('a');
		},1000);
		callback(null,'A');//第二个参数传递到最终结果中
	},
	b:['a','d',function(result,callback){//依赖a、b的结果，两个依赖都成功才会执行，如果某个依赖出错则不执行
		sleep(function(){
			console.log('b result:',result);//这里的参数result时a、b两个依赖的执行结果
		},1000);
		callback(null,'B');
	}],
	c:['a','b',function(result,callback){//有依赖的元素将被延后执行（包括元素b）
		sleep(function(){
			console.log('c result:',result);
		},1000);
		callback(null,'C');
	}],
	d:function(callback){
		sleep(function(){
			console.log('d');
		},1000);
		callback(null,'D');
	},
},function(error,result){
	console.log(error,result);
});

