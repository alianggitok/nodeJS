/**
在 iteration2.js 的基础上，增加进程守护
实现自动重启，以加强程序的稳定性
当进程遇到难以预料的问题而终结时，立即重启
*/

var cp=require('child_process'),//引入child_process模块来管理进程
	worker;

function spawn(server,config){
	worker=cp.spawn('node',[server,config]);
	worker.on('exit',function(code){//当进程退出，则重启
		console.log('exit',code);
		if(code!==0){//判断状态码
			spawn(server,config);
		}
	});
	worker.stdout.on('data',function(data){//捕获子进程的输出
		console.log(data.toString('utf-8'));
	});
}

function daemon(argv){
	spawn('server.js',argv[0]);//运行server.js
	process.on('SIGTERM',function(){//侦听终止进程事件
		worker.kill();
		process.exit(0);//设置状态码
	});
}

daemon(process.argv.slice(2));
