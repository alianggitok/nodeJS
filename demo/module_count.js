var outputVal=0,
	increment=1;

function setOutputVal(val){
	outputVal=val;
	console.log('originalOutputVal: '+outputVal);
}

function setIncrement(incrementVal){
	increment=incrementVal;
	console.log('incrementVal: '+increment);
}

function printNextCount(){
	outputVal+=increment;
	console.log(outputVal);
}

function printOutputVal(){
	console.log(outputVal);
}

exports.setOutputVal=setOutputVal;
exports.setIncrement=setIncrement;

module.exports.printNextCount=printNextCount;
