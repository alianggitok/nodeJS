var path=require('path'),
	pathName,extName;

//按照参与路径切换的顺序，最终返回实际路径
pathName=path.join('foo/','./baz/','../bar','../a');
console.log(pathName);//foo/a
pathName=path.join('foo/','./baz/','./bar','../a');
console.log(pathName);//foo/baz/a


extName=path.extname('foo/aa.js');//截取扩展名
console.log('ext:',extName);


