var fs=require('fs'),
	src='file.txt';

fs.readFile(src,function(error,data){
	var str;
	console.log(error);//成功的话error值为null
	if(error){
		console.log(error);
	}else{
		str=data.toString('utf-8');
		console.log(str);//读取返回的是二进制内容
	}
});