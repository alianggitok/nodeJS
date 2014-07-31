var server = require('./server');
var router = require('./router');
var requestHandler = require('./requestHandler');

var handle = {
	'/':requestHandler.list,
	'/list':requestHandler.list,
	'/upload':requestHandler.upload
}

server.start(router.route, handle);
