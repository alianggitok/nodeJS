var counter1=require('./counter.js'),
	counter2=require('./counter.js');
//所有require的模块只在执行过程中初始化一次
//同一模块多次require并不会让该模块被重新初始化两次

console.log(counter1.count());//1
console.log(counter2.count());//2
console.log(counter2.count());//3

