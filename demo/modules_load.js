var counter=require('./module_count');

console.log('第一次调用模块[module_count]');

counter.setOutputVal(10);
counter.setIncrement(2);

counter.printNextCount();
counter.printNextCount();
counter.printNextCount();
counter.printNextCount();

require('./module_count').printNextCount();


