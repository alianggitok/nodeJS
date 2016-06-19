var server=require('./server'),
	mime=require('./mime'),
	config={
		port:8124,
		mime:mime
	};

server.start(config);