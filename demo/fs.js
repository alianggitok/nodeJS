var fs=require('fs');

fs.readFile('/github/nodejs/demo/buffer.js',function(err,fileContent){
	if (err) {
		throw err;
	}
	console.log('file content: \n\b',fileContent.toString());
});
