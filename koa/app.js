var koa=require('koa'),
	 app=koa();

/*
app.use(function *(next){
	var start=new Date();
	yield next;
	
	var ms=new Date()-start;
	this.set('X-Response-Time',ms+'ms');

});

app.use(function *(next){
	var start=new Date();
	yield next;
	
	var ms=new Date()-start;
	console.log('method: %s\nurl: %s\nms: %s',this.method,this.url,ms);
	console.log('====================');
});

app.use(function *(){
	this.body='Hello World!';
});
*/
function* saveResults(){
	console.log('Results Saved!');
}
app.use(function* (){
	console.log('--------------------');
	console.log('header');
	yield saveResults();
	console.log('footer');
});



app.listen(3000);
app.listen(3002);