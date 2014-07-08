var http = require('http'),
	url = require('url');
var server,pathname;

function start(route, handle) { 
	function onRequest(request, response) {
		console.log('Request for '+request.url+' received.');

		pathname = url.parse(request.url).pathname;
		route(handle, pathname);

		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.write('Hello, world!');
		response.end();
	};

	server=http.createServer(onRequest);
	server.listen(process.env.PORT || 8080);
	console.log('Server has started.');
};

exports.start = start;
