var fs=require('fs');

function copy(src,dst){
	fs.createReadStream(src).pipe(fs.createWriteStream(dst));
//	fs.writeFileSync(dst,fs.readFileSync(src));
}

function main(argv){
	copy(argv[0],argv[1]);
}

main(process.argv.slice(2));//通过process获取命令行中输入的参数

//在命令行中输入 copy [src] [src]
