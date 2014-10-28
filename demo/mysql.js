var mysql=require('mysql');

var conn=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'aliang123ok',
	port:'3306',
	database:'nodesample'
});
//
//conn.connect(function(err){
//	if (err) {
//		console.log('[query]-: '+err);
//		return;
//	}
//	console.log('[connection connect] succeed!');
//});
//
//conn.query('SELECT 1+1 AS solution',function(err,rows,fields){
//	if (err) {
//		console.log('[query]-: '+err);
//		return;
//	}
//	console.log('The solution is: ',rows[0].solution);
//});
//
//conn.end(function(err){
//	if (err) {
//		return;
//	}
//	console.log('[connection end] succeed!');
//	
//});

conn.connect();

var userAddSql='INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
var userAddSql_Params=['Wilson','abcd'];

conn.query(userAddSql,userAddSql_Params,function(err,result){
	if (err) {
		console.log('[INSERT ERROR]-: ',err.message);
	}
	console.log('--------------------INSERT--------------------');
	console.log('INSERT ID: ',result);
	console.log('----------------------------------------------------');
});

conn.end();
