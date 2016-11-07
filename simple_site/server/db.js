/** mongodb module
 * @module
 */
var mongoClient=require('mongodb').MongoClient;

/** 连接到数据库
 * @param {string} connectStr - 连接字符串
 * @param {object} options - 连接选项，对connectStr的补充
 * @param {function} success - callback when db server connected 
 */
function connect(connectStr,options,success){
	mongoClient.connect(connectStr,options,function(err,db){
		if(err){
			console.error(err.name+':',err.message);
			return;
		}else{
			console.log('database server connected!');
			success(db);
		}

	});
};

module.exports={
	connect:connect
};
