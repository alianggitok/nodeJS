
function handle(req,routeHandler){
	routeHandler(req);
}

exports.handle=handle;