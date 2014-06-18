var http = require('http');

function start() { 
	function onRequest(request, response) {
		console.log('Request received.');
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.write('Hello, world!');
		response.end();
	};

	var server=http.createServer(onRequest);

	server.listen(process.env.PORT || 8080);

	console.log('Server has started.');
};

exports.start = start;
