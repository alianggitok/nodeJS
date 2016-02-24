define(['jquery','angular'],function($,ng){
	var module=ng.module('app',[]);
	
	module.controller('controller',function($scope){
		$scope.text='Hello world!';
	});
	
});