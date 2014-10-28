var eventEmitter=require('events').EventEmitter,
	emitter=new eventEmitter(),
	isSuccess;

emitter.setMaxListeners(5);

var emitEvent=function(foo,bar){
	console.log('参数foo='+foo+', bar='+bar);
};

emitter.on('some_events',emitEvent);
emitter.on('some_events1',emitEvent);
emitter.on('some_events2',emitEvent);
emitter.on('some_events3',emitEvent);

var emitterListenersLen=eventEmitter.listenerCount(emitter,'some_events');
console.log(
	'listeners: '+emitterListenersLen+'\n'
);

emitter.removeListener('some_events2',emitEvent);
emitter.removeAllListeners('some_events3',emitEvent);

isSuccess=emitter.emit('some_events1','wilson','A');
console.log(isSuccess);
isSuccess=emitter.emit('some_events2','wilson','B');
console.log(isSuccess);
isSuccess=emitter.emit('some_events3','wilson','C');
console.log(isSuccess);

isSuccess=emitter.emit('some_events','wilson','C');

emitter.removeAllListeners();

console.log(isSuccess);

