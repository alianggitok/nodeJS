var async=require('async');

var concurrencyCount=0,
	 urls=[];

function fetchContent(url,callback){//伪造响应内容
	var delay=parseInt((Math.random()*10000000)%2000,10);
	concurrencyCount++;
	console.log('当前并发数'+concurrencyCount+'，正在抓取'+url+'，耗时'+delay+'毫秒。');
	setTimeout(function(){
		concurrencyCount--;
		callback(null,url+' html content');
	},delay);
}

for(var i=0; i<30; i++){//伪造链接
	urls.push('http://datasource_'+i);
}

async.mapLimit(urls,5,function(url,callback){
	fetchContent(url,callback);
},function(err,result){
	console.log('final:');
	console.log(result);
});

