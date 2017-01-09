var async=require('async');

function sleep(callback,ms){
	var start=new Date().getTime();
	while(new Date().getTime()<(start+ms)){}//这可以阻塞整个进程
	callback();
}

async.waterfall([//串行，最终结果是最后一个元素的执行结果
	function(callback){
		sleep(function(){
			console.log(1);
		},1000);
		callback(null,'yes!');//输出执行结果，第一个参数为错误信息，null表示无错误；第二个参数为处理结果，会传递到下一个函数中
								//当没有错误（callback第一个参数）则继续下一个,第二个参数会传递给下一个function的第一个参数
	},
	function(arg,callback){//arg为前一个函数元素传递过来的值
		sleep(function(){
			console.log(2,arg);
		},1000);
		callback('error!','good!');//当有错误（callback第一个参数）则中止，最终result会是出错函数输出的结果‘good!’
	},
	function(arg,callback){
		sleep(function(){
			console.log(3,arg);
		},1000);
		callback(null,'done!');
	}
],function(error,result){//中止或通过都将调用该回调
	console.log('reuslt:',error,result);//result对象默认key为数字序号（从0开始）
});

