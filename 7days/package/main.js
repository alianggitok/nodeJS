//两种require方法都无需写全入口文件名

var pack1=require('./pack1');//引用以index.js作为入口的package
var pack2=require('./pack2');//引入以package.json作为包管理文件的package



pack1.get();

pack2.get();


//也可以在命令行直以 node [packname] 的形式执行包
