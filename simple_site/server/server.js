/** server
 * @module
 * @requires server/router
 * @requires server/responser
 * @requires server/requester
 * @requires server/config
 */
var http=require('http'),
	router=require('./router'),
	responser=require('./responser'),
	requester=require('./requester'),
	config=require('../config');

/** launch server
 * 先载入router，通过router调配请求与响应
 */
function start(){
	var service=function(req,res){
		router.route(req,res,requester,responser);
	};

	http.createServer(service).listen(config.port);
	console.log('Server started on port '+config.port);
}

exports.start=start;

