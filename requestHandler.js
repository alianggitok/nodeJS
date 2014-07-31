var exec = require('child_process').exec;

function list(response) {
	console.log('Request handler "list" was called.');

	exec('ls -lah', function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(stdout);
		response.end();
	})
}
function upload(response) {
	console.log('Request handler "upload" was called.');
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('hello upload.');
	response.end();
}

exports.list = list;
exports.upload = upload;
