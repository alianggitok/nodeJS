//通过数据流防止大文件读写的爆仓，pipe方法与这里的实现作用是相同的
var fs=require('fs');

function copy(src,dst){
	function c(src,dst){
		var rs=fs.createReadStream(src),//建立只读数据流
			ws=fs.createWriteStream(dst),//建立只写数据流
			s=fs.statSync(src),//获取对象文件状态
			totalSize=s.size,//对象文件大小
			passedSize=0,//已传递的大小
			percent='';//已传递的百分比

		rs.on('data',function(chunk){//数据读取中
			var wrote=ws.write(chunk);//写入目标，并返回写入状态
			passedSize+=chunk.length;//计算已传递的大小
			percent=Math.floor(passedSize/totalSize*100)+'%';
			console.log('passedSize: '+passedSize+'/'+totalSize+'(KB), percent: '+percent+';');
			if(!wrote){//判断传入数据流是否写入目标了，还是临时存放在缓存
				rs.pause();//如果没有写入目标，则暂停流的读取
			}
		});
		ws.on('drain',function(){//侦测数据流是否写入目标
			rs.resume();//重启流的读取，继续未完的流操作
		});
		rs.on('end',function(){//读取结束
			ws.end();
			console.log('stream end.');
		});
	}

	fs.exists(src,function(exist){//源文件是否存在
		if(!exist){
			console.log('file not exist.');
			return false;
		}else{
			c(src,dst);
		}
	});

}

exports.copy=copy;
