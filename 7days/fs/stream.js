//通过数据流防止大文件读写的爆仓，pipe方法与这里的实现作用是相同的
var argv=process.argv.slice(2),//截取命令行第三个参数开始的字符组作为传参
	src=argv[0],
	dst=argv[1],
	fs=require('fs'),
	readStream=fs.createReadStream(src),//建立只读数据流
	writeStream=fs.createWriteStream(dst);//建立只写数据流


readStream.on('data',function(chunk){//数据读取中
	var ws=writeStream.write(chunk);//写入目标，并返回写入状态
	if(!ws){//判断传入数据流是否写入目标了，还是临时存放在缓存
		readStream.pause();//如果没有写入目标，则暂停流的读取
	}
});

readStream.on('end',function(){//读取结束
	writeStream.end();
});

writeStream.on('drain',function(){//侦测数据流是否写入目标
	readStream.resume();//重启流的读取
});

