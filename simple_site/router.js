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
	console.log('route path to: '+pathname);

	function routeHandler(req){
		var responseHandle=responser.handle(req,res,mime);
		switch(pathname){
			case '/':
				responseHandle.index();
				break;
			case '/start':
				responseHandle.start();
				break;
			case '/sleep':
				responseHandle.sleep();
				break;
			case '/dir':
				responseHandle.dir();
				break;
			case '/form':
				responseHandle.form();
				break;
			case '/submitResult':
				responseHandle.submitResult();
				break;
			case '/upload':
				responseHandle.upload();
				break;
			case '/uploadResult':
				responseHandle.uploadResult();
				break;
			default:
				responseHandle.others();
		}
	}
	
	requester.handle(req,routeHandler);
	
	
}

exports.route=route;