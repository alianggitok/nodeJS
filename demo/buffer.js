var buf=new Buffer(1024);

buf[1]=123;

console.log(buf[1].toString('base64'));