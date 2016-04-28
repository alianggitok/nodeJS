var bin=new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);//一个二进制实例
console.log(bin);

var string=bin.toString('utf-8');//将二进制转换成utf-8字符串
console.log(string);

var binary=new Buffer(string,'utf-8');//将utf-8字符串转换成二进制
console.log(binary);
