var express=require('express');
var bodyParser = require('body-parser');
var path=require('path');
var _=require('underscore');
var mongoose=require('mongoose');
var movieM=require('./views/models/movie.js')
var port=process.env.PORT||3000;
var app=express();

mongoose.connect('mongodb://localhost/hello');

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);

console.log('imooc started on port '+port);

//index
app.get('/',function(request,response){
	movieM.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}
		response.render('index',{
			layout:false,
			title:'imooc index page',
			movies:movies
		})
	})
})

//detail
app.get('/movie/:id',function(request,response){
	var id=request.params.id;
	movieM.findById(id, function(err,movie){
		response.render('detail',{
			title:'imooc detail page',
			movie:movie
		})
	})
})

//admin
app.get('/admin/movie',function(request,response){
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

//update movie
app.post('admin/update/:id',function(request,response){
	var id=request.params.id
	if (id) {
		movieM.findById(id,function(err,movie){
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
	}
})


//post movie
app.post('admin/movie/new',function(request,response){
	var id=request.body.movie._id;
	var movieObj=request.body.movie;
	var _movie
	if (id!=='undefinded') {
		movieM.findById(id,function(err,movie){
			if (err) {
				console.log(err)
			}
			_movie=_.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if (err) {
					console.log(err)
				}
				respose.redirect('/movie/'+movie._id)
			})
		})
	}else{
		_movie=new movieM({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})
		_movie.save(function(err,movie){
			if (err) {
				console.log(err)
			}
			response.redirect('/movie/'+movie._id)
		})
	}
})

//list
app.get('/admin/list',function(request,response){
	movieM.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}
		response.render('list',{
			title:'imooc list page',
			movies:movies
		})
	})
})
