/** 路由
 * 调配请求与响应
 * @module
 */

/**路由处理
 * @param req {object} request from http
 * @param res {object} response from http
 * @param requester {object} from .server/requester
 * @param responser {object} from .server/responser
 */
function route(req,res,requester,responser){
	var resHandler=responser.handle(req,res),
		reqHandler=requester.handle,
		routeHandler=function(pathname,queries,req){
			switch(pathname){
				case '/':
					resHandler.index();
					break;
				case '/start':
					resHandler.start();
					break;
				case '/sleep':
					resHandler.sleep();
					break;
				case '/dir':
					resHandler.dir();
					break;
				case '/form':
					resHandler.form.page();
					break;
				case '/formResult':
					resHandler.form.result();
					break;
				case '/upload':
					resHandler.upload();
					break;
				case '/uploadResult':
					resHandler.uploadResult();
					break;
				case '/db':
					resHandler.db.page();
					break;
				case '/db/find':
					resHandler.db.find(queries);
					break;
				case '/db/insert':
					resHandler.db.insert(queries);
					break;
				default:
					return;
			}

		};
	
	reqHandler(req,routeHandler);//调取请求处理器，并传入路由处理器准备路由

}

exports.route=route;
