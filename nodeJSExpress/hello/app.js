var express=require('express');
var bodyParser = require('body-parser');
var path=require('path');
var port=process.env.PORT||3000;
var app=express();

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);

console.log('imooc started on port '+port);

//index
app.get('/',function(require,response){
	response.render('index',{
		layout:false,
		title:'imooc index page',
		movies:[
			{
				title:'机械战警1',
				_id:1,
				poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警2',
				_id:1,
				poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警3',
				_id:1,
				poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警4',
				_id:1,
				poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警5',
				_id:1,
				poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			}
			
		]
	})
})

//detail
app.get('/movie/:id',function(require,response){
	response.render('detail',{
		title:'imooc detail page',
		movie:{
			title:'机械战警1',
			doctor:'何塞·帕迪里亚',
			country:'美国',
			year:'2014',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'《机械战警》（2014）是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
		}
	})
})

//admin
app.get('/admin/movie',function(require,response){
	response.render('admin',{
		title:'imooc admin page',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	})
})

//list
app.get('/admin/list',function(require,response){
	response.render('list',{
		title:'imooc list page',
		movies:[
		       {
				_id:1,
				title:'机械战警1',
				doctor:'何塞·帕迪里亚',
				country:'美国',
				year:'2014',
				language:'英语',
				flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			}
		]
	})
})
