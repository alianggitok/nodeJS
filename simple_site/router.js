var url=require('url'),
	requester=require('./requester'),
	responser=require('./responser'),
	requestTimes=0;

function route(req,res,mime){
	var pathname=url.parse(req.url).pathname;
	
	console.log('\n※※※※※※※※※※※※※※※※※※※※ '+
				(requestTimes+=1)+
				' ※※※※※※※※※※※※※※※※※※※※');
	console.log('request url: '+req.url);
	console.log('route to: '+pathname);

	function routeHandler(req){
		var responseHandle=responser.handle(req,res,mime);

		if(pathname==='/'){
			responseHandle.index();
		}else if(pathname==='/start'){
			responseHandle.start();
		}else if(pathname==='/sleep'){
			responseHandle.sleep();
		}else if(pathname==='/dir'){
			responseHandle.dir();
		}else if(pathname==='/form'){
			responseHandle.form();
		}else if(pathname==='/formResult'){
			responseHandle.formResult();
		}else if(pathname==='/upload'){
			responseHandle.upload();
		}else if(pathname==='/uploadResult'){
			responseHandle.uploadResult();
		}

	}
	
	requester.handle(req,routeHandler);
	
}

exports.route=route;