var fs=require('fs'),
	contents,
	rs=fs.createReadStream('file.txt');

rs.on('readable',function(){
	var str,
		d=rs.read();
	if(d){
		if(typeof d=='string'){
			str=d;
		}else if(typeof d=='object' && d instanceof Buffer){
			str=d.toString('utf8');
		}
		if(str){
			if(!contents){
				contents=d;
			}else{
				contents+=str;
			}
		}
	}
});

rs.on('end',function(){
	console.log('read in the file contents:');
	console.log(contents.toString('utf8'));
});