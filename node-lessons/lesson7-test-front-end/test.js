var should=chai.should();

describe('simple test',function(){
	it('should equal 0 when n === 0',function(){
		fibonacci(0).should.equal(0);//断言
	});
});