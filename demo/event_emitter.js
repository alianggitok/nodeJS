var eventEmitter=require('events').EventEmitter,
	emitter=new eventEmitter(),
	isSuccess;

emitter.setMaxListeners(5);

var emitEvent=function(foo,bar){
	console.log('参数foo='+foo+', bar='+bar);
};

//regist events listener
emitter.on('some_events',emitEvent);
emitter.on('some_events',emitEvent);
emitter.on('some_events1',emitEvent);
emitter.on('some_events2',emitEvent);
emitter.on('some_events3',emitEvent);

//listener length
function emitterListenersCount(){
	var len=eventEmitter.listenerCount(emitter,'some_events');//事件被侦听的次数
	console.log('listeners: '+len+'\n');
}
emitterListenersCount();

//remove listener
emitter.removeListener('some_events2',emitEvent);
emitter.removeAllListeners('some_events3',emitEvent);

isSuccess=emitter.emit('some_events','wilson','C');
console.log(isSuccess);//true
isSuccess=emitter.emit('some_events1','wilson','A');
console.log(isSuccess);//true
isSuccess=emitter.emit('some_events2','wilson','B');
console.log(isSuccess);//false
isSuccess=emitter.emit('some_events3','wilson','C');
console.log(isSuccess);//false

emitter.removeAllListeners();//移除所有

emitterListenersCount();
