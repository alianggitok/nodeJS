function fibonacci(n){//简单的斐波那契计算公式
	if(n===0){
		return 0;
	}
	if(n===1){
		return 1;
	}
	return fibonacci(n-1)+fibonacci(n-2);
}

if(require.main===module){//如果是直接执行的，则调取fibonacci函数
	var n=Number(process.argv[2]),//命令行执行时赋予的参数，如cmd中输入“node app 10”，则n=10
		 result=fibonacci(n);//执行斐波那契计算
	console.log('fibonacci('+n+') is',result);
}

exports.fibonacci=fibonacci;

