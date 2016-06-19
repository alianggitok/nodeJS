/*
	一个完整的url的组成：
	http:	//user:pass	@host.com	:8080	/path/	?query=string	#hash
	protocol	auth	hostname	port	pathname	search		hash
*/

var url=require('url');

console.log('========================== parse ==========================');
//解析一个url，得到一个分解对象
var parse1=url.parse('http://user:pass@host.com:8080/path/?query=string#hash');
console.log(parse1);

var parse2=url.parse('http://www.baidu.com/path/?query=string');
console.log(parse2);



console.log('========================== format ==========================');
//可以格式化一个包含url属性的对象，并返回完整的url字符串
var format1=url.format({
	protocol:'http',
	hostname:'www.example.com',
	pathname:'info',
	search:'q=string'
});
console.log(format1);

var format2=url.format(parse2);
console.log(format2);


console.log('========================== resolve ==========================');
//resolve 用来拼接url，类似于path模块的join方法
var result1=url.resolve('htp://www.example.com/path/module/','../a');
console.log(result1);

var result2=url.resolve('htp://www.example.com/','path/search');
console.log(result2);