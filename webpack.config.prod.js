var path = require('path')

var webpack = require('webpack')

//在内存中生成index.html
var HtmlWebpackPlugin = require('html-webpack-plugin')

//导入抽离样式的第三方包
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//打包之前，删除dist目录
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    //entry:'./src/main.js',//打包的入口文件
    entry:{
        //属性名称，是最终生成好的js文件名称，值是我们安装时候的第三方包的名称
        mintUi:['mint-ui'],
        moment:['moment'],
        quanjiatong:['vue','vue-router','vuex'],
        vueResource:['vue-resource'],
        vuePreview:['vue-preview'],
        axios:['axios'],
        bundle:'./src/main.js' //别忘记自己写的源代码
    },
	output:{
        path:path.join(__dirname,'dist'),
        filename:'js/[name].js'
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
                // use:[
                //     {
                //         loader:'style-loader'
                //     },
                //     {
                //         loader:'css-loader'
                //     }
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(ttf)$/,
                use: [
                    {
                        /*
                            limit：
                                表示的是一个阀值,如果当前我们资源中的图片大小
                                4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js,4kb只是我这设置的一个值,实际开发过程中要根据业务来
    
                            name:抽离出来的图片，放在哪个文件夹下，用什么文件名称命名
                                [name]代表你原始的文件名称
                                [hash:5] 避免图片换了之后，浏览器还加在原先的图片,解决缓存的问题
                                [ext] 图片本身的拓展名
                        */
                        loader: 'url-loader?limit=15000&name=fonts/[name]-[hash:5].[ext]'
                    }
                ]
            },
            {
                test: /\.(png|gif|svg)$/,
                use: [
                    {
                        /*
                            limit：
                                表示的是一个阀值,如果当前我们资源中的图片大小
                                4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js,4kb只是我这设置的一个值,实际开发过程中要根据业务来
    
                            name:抽离出来的图片，放在哪个文件夹下，用什么文件名称命名
                                [name]代表你原始的文件名称
                                [hash:5] 避免图片换了之后，浏览器还加在原先的图片,解决缓存的问题
                                [ext] 图片本身的拓展名
                        */
                        loader: 'url-loader?limit=4000&name=images/[name]-[hash:5].[ext]'
                    }
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, //排除第三方
                loader: "babel-loader" 
            },
            {
                test: /vue-preview.src.*?js$/,//处理vue-preview
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        //打包之前，删除dist目录，写在其它插件前面
        new CleanWebpackPlugin('dist'),

        //在生产阶段，会根据template生成一个实实在在的物理文件
        new HtmlWebpackPlugin({
            template:'./template.html', //参照的模版html
            filename:'index.html',//在内存中生成的index.html
            minify:{
                minifyCSS:true,
                minifyJS:true,
                removeComments:true,
                collapseWhitespace:true
            }
        }),

        //在运行打包命令时将 NODE_ENV 设置为 "production"。这等于告诉 vueify 避免引入热重载和开发相关的代码。
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
        }),

        //压缩js的插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false //压缩警告
            },
            comments: false //去掉版权信息等注释
        }),

        //抽离第三方包的，这里不要写bundle.js
        new webpack.optimize.CommonsChunkPlugin({
            name: ['mintUi','moment','quanjiatong','vueResource','vuePreview','axios'],
            // filename: "vendor.js"
            // (给 chunk 一个不同的名字)
        
            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        }),

        //抽离样式到css/styles.css下面去
        new ExtractTextPlugin("css/styles.css")
    ]
}
