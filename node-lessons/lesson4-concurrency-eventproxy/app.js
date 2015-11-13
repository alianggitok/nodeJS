var eventproxy=require('eventproxy'),
	 superagent=require('superagent'),
	 cheerio=require('cheerio'),
	 url=require('url');

var cnodeUrl='https://cnodejs.org';

superagent.get(cnodeUrl).end(function(err,res){//首次请求，用以抓取各topic的url
	if(err){
		return console.log(err);
	}
	
	var topicUrls=[],
		 $=cheerio.load(res.text);//读出网页内容，并以类似jquery形式做DOM操作
	
	//获取cnodejs.org的topic url
	$('#topic_list .topic_title').each(function(index,element){
		var $elem=$(element),
			 href=url.resolve(cnodeUrl,$elem.attr('href'));//url.resolve()用来取得完整的url
		
		topicUrls.push(href);
	});
	
	console.log(topicUrls.length,topicUrls);
	
	//实例化一个事件代理器
	var ep=new eventproxy();
	
	//定义after事件
	ep.after('topic_html_event',topicUrls.length,function(topics){
		topics=topics.map(function(topicPairs){//生成
			var url=topicPairs[0],
				 html=topicPairs[1],
				 $=cheerio.load(html);
			
			return {
				title:$('.topic_full_title').text().trim(),
				href: url,
				comment:$('.reply_content').eq(0).text().trim()
			};
		});
		console.log('final:');
		console.log(topics);//输出
	});
	
	topicUrls.forEach(function(url){//遍历每个url
		superagent.get(url).end(function(err,res){//每次请求成功后通知事件代理，触发after()中的回调
			console.log('fetch',url,'successful');
			ep.emit('topic_html_event',[url,res.text]);//通知
		});
	});
	
	
});
