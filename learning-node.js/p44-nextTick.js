//用两个数组的交集计算来演示process.nextTick()
function intersection(arr1,arr2,callback){
	var bigger=(arr1.length>arr2.length)?arr1:arr2,
		smaller=(bigger==arr1)?arr2:arr1,
		bigLen=bigger.length,
		smallLen=smaller.length,
		sidx=0,
		size=10,
		results=[];
	
	function sub(){
		var i;
		for (i=sidx; i<(sidx+size)&&i<bigLen; i++){
			for(var n=0; n<smallLen; n++){
				if(bigger[i]==smaller[n]){
					results.push(smaller[n]);
					break;
				}
			}
		}
		if(i>bigLen){
			callback(null,results);
		}else{
			sidx+=size;
			
			//调用nextTick，使得sub可以等待其他任务完成后再继续执行，成为异步调用，
			//并保持闭包性质（这样可以让results保存在intersection函数（的变量results）中）
			console.log(sidx,i);
			process.nextTick(sub);
		}
	}
	sub();
}


var a1=[3476,2457,7547,34523,3,6,7,2,77,8,2345,7623457,2347,23572457,237457,234867,237,24572457524],
	a2=[3476,75347547,2457634563,56763472,34574,2347,7,34652364,13461346,572346,23723457234,237,234,
		24352345,537,2345235,2345675,34534,7582768,284835,8553577,2577257,545634,457247247,2345];

intersection(a1,a2,function(err,results){
	if(err){
		console.log(err);
	}else{
		console.log(results);
	}
});