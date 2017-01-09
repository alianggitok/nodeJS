//通过数据流防止大文件读写的爆仓，pipe方法与这里的实现作用是相同的
var argv=process.argv.slice(2),//截取命令行第三个参数开始的字符组作为传参
	src=argv[0],
	dst=argv[1],
	out=process.stdout,
	fs=require('fs'),
	readStream=fs.createReadStream(src),//建立只读数据流
	writeStream=fs.createWriteStream(dst),//建立只写数据流
	stat=fs.statSync(src),//获取对象文件状态
	totalSize=stat.size,//对象文件大小
	passedSize=0,//已传递的大小
	percent='';//已传递的百分比

readStream.on('data',function(chunk){//数据读取中
	var wrote=writeStream.write(chunk);//写入目标，并返回写入状态
	passedSize+=chunk.length;//计算已传递的大小
	percent=Math.floor(passedSize/totalSize*100)+'%';
	console.log('passedSize: '+passedSize+'/'+totalSize+'(KB), percent: '+percent+';');
	if(!wrote){//判断传入数据流是否写入目标了，还是临时存放在缓存
		readStream.pause();//如果没有写入目标，则暂停流的读取
	}
});

writeStream.on('drain',function(){//侦测数据流是否写入目标
	readStream.resume();//重启流的读取，继续未完的流操作
});

readStream.on('end',function(){//读取结束
	writeStream.end();
	console.log('stream end.');
});

