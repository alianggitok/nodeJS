var http = require('http'),
	url = require('url'),
	server = null,
	pathname = null;

function start(route, handle) {

	server=http.createServer(function(request, response) {
		console.log('--> Request for '+request.url+' received.');

		pathname = url.parse(request.url).pathname;
		route(handle, pathname, response);
	});
	server.listen(process.env.PORT || 8080);
	console.log('Server has started.');

}

exports.start = start;
