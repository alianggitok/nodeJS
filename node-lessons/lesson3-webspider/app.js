var express=require('express'),
	 cheerio=require('cheerio'),
	 superagent=require('superagent'),
	 app=express();

app.get('/',function(req,res,next){
	
	//用superagent抓取cnodejs.org上的内容
	superagent.get('https://cnodejs.org/').end(function(err,sres){
		if(err){//错误处理
			return next(err);
		}
		
		// sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
		// 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
		// 剩下就都是 jquery 的内容了
		
		var $=cheerio.load(sres.text),
			 items=[];
		
		$('#topic_list .topic_title').each(function(idx,element){
			var $elem=$(element);
			items.push({
				id:idx,
				title:$elem.attr('title'),
				href:$elem.attr('href')
			});
		});
		
		res.send(items);
		
	});
});

app.listen(3000,function(req,res){
	console.log('app is running at port 3000');
});