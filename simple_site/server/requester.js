/** requester
 * @module
 */

var url=require('url'),
	qs=require("querystring"),
	requestTimes=0;

/** request handle
 * @param req {object} request object from http
 * @param routeHandler {function} callback，执行路由处理
 */
function handle(req,routeHandler){
	var urlParse=url.parse(req.url),
		pathname=urlParse.pathname,
		queries=qs.parse(urlParse.query);
	
	console.log('\n※※※※※※※※※※※※※※※※※※※※ '+(requestTimes+=1)+' ※※※※※※※※※※※※※※※※※※※※');
	console.log('request url:',req.url);
	console.log('request queries:',queries);
	console.log('route to:',pathname);

	routeHandler(pathname,queries,req);//执行路由处理
}

exports.handle=handle;