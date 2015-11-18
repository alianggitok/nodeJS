function fibonacci(n){//简单的斐波那契计算公式
	if(n===0){
		return 0;
	}
	if(n===1){
		return 1;
	}
	return fibonacci(n-1)+fibonacci(n-2);
}