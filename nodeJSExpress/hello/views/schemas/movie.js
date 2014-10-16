var mongoose=require('mongoose');
var movieSchema=new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		createAt:{
			type:Date,
			default:Date.now()
		}
	}
});

movieSchema.pre('save',function(next){
	if (this.isNew) {
		this.meta.createAt=this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt=Date.now();
	}
	next();
})

movieSchema.statics={
	
}