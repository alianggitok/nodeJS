var qs=require('querystring');

console.log('========================== parse ==========================');
//解析为一个对象
var qsParse=qs.parse('q=1&page=1&pageSize=20');
console.log(qsParse);

console.log('========================== stringify ==========================');
//或者将一个对象解析为字符串
var qsString=qs.stringify({
	a:'1',
	b:'2',
	c:'3'
});
console.log(qsString);