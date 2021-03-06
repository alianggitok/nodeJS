var webpack=require('webpack'),
	requestSync=require('sync-request'),
	path=require('path'),
	ExtractTextPlugin=require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin=require('html-webpack-plugin'),
	HtmlResWebpackPlugin=require('html-res-webpack-plugin'),
	plugins={//插件
		makeCommons:function(opts){
			return new webpack.optimize.CommonsChunkPlugin(opts);
		},
		minimize:function(opts){
			return new webpack.optimize.UglifyJsPlugin(opts);
		},
		extractCss:function(opts){
			return new ExtractTextPlugin(opts);
		},
		makeHtml:function(opts){
			return new HtmlWebpackPlugin(opts);
		},
		makeResHtml:function(opts){
			return new HtmlResWebpackPlugin(opts);
		}
	};
// var html=requestSync('POST','http://devstage-us.ceair.com/system/include/ceairheader.html').getBody('utf-8');


// console.log(html)

module.exports={
//	context:'./src',
	externals:{//不打包
		'jquery':'$',
		'angular':'ng'
	},
	entry:{
		index:'./src/entry/index.js',
		page1:'./src/entry/page1.js'
	},
	output:{
		path:'./public/',//打包输出路径
		publicPath:'/public/',
			//publicPath，发布文件中引用资源的头路径，这里用了个绝对路径“/”打头的
			//css等文件内的url指向会随之变化，可用来配置CDN
		filename:'js/[name].js?[hash:8]',//[name]对应entry的键名
		chunkFilename:'js/[name].[id].chunk.js?[hash:8]'
	},
	module:{
		loaders:[
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
//			{test: /\.css$/, loader: 'style!css'},//这样加载会把css存入js，并通过js动态插入css到<style>标签
			{test:/\.js$/,loader:'jsx?harmony',exclude:'./node_modules'},
			{test:/\.(jpe?g|png|gif|svg)$/,loader:'url?limit=20000&name=img/[name].[ext]?[hash:8]'}//这里name的路径指向的思路应当和编写css时一致
		]
	},
	resolve:{
//		root:'./public',//绝对路径
		extensions:['','.js'],//自动补全扩展名
		alias:{//模块别名，方便调用
//			jquery:'js/lib/jquery.js'
		}
	},
	plugins:[
//		plugins.minimize(),//压缩/格式化代码，包括css
		plugins.makeCommons({//生成common.js自动整理出共用代码
			name:'common',
			miniChunks:2//一个模块至少被调用两次才会打包到common
		}),
		//提取文本文件的插件，用来提取css不打包而直接输出到output，
		//引入plugin同时需要在loader中设置，最后以<link>的形式嵌入html
		plugins.extractCss('style/[name].css'),//配置输出路径及文件名
		//生成多个html文件
		plugins.makeHtml({
			favicon:'favicon.ico',
			hash:true,//给资源路径自动添加hash后缀
			inject:'body',//指定脚本等资源注入html的位置，默认body
			template:'src/tmpl/index.html',//模板路径，可以是ejs、html等
			filename:'index.html',//输出文件名
			chunks:['common','index']
				//配置chunkname（依据entry.[name]），限定该页面加载的资源，包括css、js，
				//对应相反作用的参数为excludeChunks（排除某个chunk），
				//控制chunk顺序的chunksSortMode参数
		}),
		// plugins.makeHtml({
		// 	favicon:'favicon.ico',
		// 	hash:true,
		// 	inject:'body',
		// 	template:'src/tmpl/page1.html',
		// 	filename:'page1.html',
		// 	chunks:['common','page1']
		// }),
		plugins.makeResHtml({
			favicon:'favicon.ico',
			filename:'page1.html',
			template:'src/tmpl/page1.html',
			templateContent:function(tpl){
				console.log('HtmlResWebpackPlugin:',tpl);
				return tpl;
			}
		})
	],
	devServer: {//webpack-dev-server配置
		contentBase:'./public/',//localhost指向的根目录
		inline:true,//inline方式实时刷新页面
		progress:true,
		port:'8081'//服务端口
	}
	
	
};