var express=require('express'),
	 app=express();

function fibonacci(n){
	if(typeof n!=='number'||isNaN(n)){
		throw new Error('n should be a Number');
	}
	if(n<0){
		throw new Error('n should >= 0');
	}
	if(n>10){
		throw new Error('n should <= 10');
	}
	
	if(n===0){
		return 0;
	}
	if(n===1){
		return 1;
	}
	
	return fibonacci(n-1)+fibonacci(n-2);
}


app.get('/fib',function(req,res){
	var n=Number(req.query.n);//将res的字符转为number类型，因为http传回的东西都是string
	try{
		var things=String(fibonacci(n));//同样发送到客户端的也得是string
		res.send(things);
	}catch(err){
		res.status(500).send(err.message);//如果出错，则给出状态码和fibonacci函数中抛出的错误信息
	}
});

module.exports=app;//暴露app

app.listen(3000,function(){//分配监听端口
	console.log('app is listening at port 3000');

});

//浏览器中访问 http://localhost:3000/fib?n=10 得到结果55
