//以下测试需要mocha驱动（用npm全局安装mocha）

var app=require('app'),
	 should=require('should');

describe('app.test.js',function(){
	it('should equal 55 when n === 10',function(){
		app.fibonacci(10).should.equal(55);
	});
});