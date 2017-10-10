var b = require('./b.js');
b.b();

if (module.hot) {
	module.hot.accept();
	console.log('Hi module.hot');
}