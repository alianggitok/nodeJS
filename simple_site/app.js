/** App start, link <a href="http://blog.pagegaga.com">blog.pagegaga.com</a> to see more.
 * @module
 * @author Warren <aliang_ok@sina.com>
 * @copyright warren 2016
 * @see module:server/server
 * @requires server/server
 * @requires config
 */
var server=require('./server/server'),
	config=require('./config');

server.start(config);
