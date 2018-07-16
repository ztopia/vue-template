var path = require('path')

//在内存中生成index.html
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/main.js',//打包的入口文件
	output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    resolve: {
        alias: { //别名
            '@': './components/',
            '$dev':'http://192.168.33.88:8899/',
            '$prod':'http://vue.studyit.io/'        
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module:{
        rules:[
            {//对.vue结尾的文件进行处理
                test:/.vue$/,
                use:[
                    {
                        loader:'vue-loader'
                    }
                ]
            },
            {//对.css结尾的文件进行处理
                test:/.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            },
            {
                test: /\.(ttf|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./template.html', //参照的模版html
            filename:'index.html'//在内存中生成的index.html
        })
    ]
}
