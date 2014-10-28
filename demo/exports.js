function info(name) {
	console.log(name);
}
function title(txt) {
	console.log(txt);
}
function parent(){
	console.log(module.parent);
}

exports.info={
	info:info,
	title:title,
	parent:parent
};
