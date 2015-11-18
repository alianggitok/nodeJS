//以下测试需要mocha驱动（用npm全局安装mocha）

var app=require('../app'),//引入将要测试的模块
	 should=require('chai').should();//这是一个BDD风格的断言工具

describe('../app.test.js',function(){//描述测试主体（mocha）
	var n=10;
	it('should equal 55 when n === '+n,function(){//描述case（mocha）
		app.fibonacci(n).should.equal(55);//测试fibonacci函数结果是否等于55（should）
	});
	it('should above 50 when n === '+n,function(){
		app.fibonacci(n).should.above(50);//测试结果是否大于50（should）
	});
});