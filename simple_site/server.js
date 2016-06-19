var http=require('http'),
	router=require('./router');


function start(config){
	var service=function(req,res){
		router.route(req,res,config.mime);
	};
	
	http.createServer(service).listen(config.port);
	console.log('Server started on port '+config.port);
}

exports.start=start;

