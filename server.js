var express = require('express')
var webpack = require('webpack')
var path = require('path')
var app = express()
var webpackMiddleware = require("webpack-dev-middleware");
var compiler = webpack({
    entry: 
    ["./src/a.js",
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    ],
    output: {
        path: path.resolve(__dirname, './output/'),
        filename:'bundle.js',
    },
    // 注意：http://100bug.com/question/70
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
})
var options ={
    publicPath: "/",
}
app.use(webpackMiddleware(compiler, options));
app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static('output'))
app.listen(8080, function () {
    console.log('Example app listening on!')
})


/*
其中 dev 中间件中涉及到的入口文件的做法和一般的 webpack 做法一样，但是多出一个 webpack-hot-middleware/client 文件，此文件用来传递到客户端，并和服务器的 HMR 插件联络，联络的 URL 为path=/__webpack_hmr&timeout=20000,其中 path 有 HMR 服务监听，timeout 则可以望文生义，知道失联的话，达到20000毫秒就算超时，不必再做尝试。

为了让 HMR 知道 a、b 文件是可以热加载的，必须在入口文件内（也就是 a.js)内的尾部加入代码：

if (module.hot) {
  module.hot.accept();
}
*/