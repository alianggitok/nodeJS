var path=require('path');

function normalize(value){
	var str=path.normalize(value);//标准化path
	console.log(str);
}

normalize('../../7days/');//转为可识别的路径
normalize('../..//7days');//可以去掉多余的斜杠
normalize('');//.
normalize('./../7days');//../a，省去了多余的./
//...

//window及linux下斜杠的表现不同，所以为了兼容，需要再做replace()操作
