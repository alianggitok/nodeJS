var Benchmark=require('benchmark'),
	 suite=new Benchmark.Suite;


function int1(str){
	return +str;
}

function int2(str){
	return parseInt(str,10);
}

function int3(str){
	return Number(str);
}


var number='100';


suite.add('[+]',function(){//添加测试
	int1(number);
}).add('[parseInt]',function(){//添加测试
	int2(number);
}).add('[Number]',function(){//添加测试
	int3(number);
}).on('cycle',function(event){//每轮测试返回信息
	console.log(String(event.target));
}).on('complete',function(){//测试完成返回信息
	console.log('Fastest is '+this.filter('fastest').pluck('name'));
}).run({'async':true});


