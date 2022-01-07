// 引入node.js中的Path模块
const path = require('path')
const webpack = require('webpack') // 引入webpack
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    /*******单入口**********/
    // entry: './src/index.js', // 单入口
    // output: { // 单入口输出
    //     // 进行路径拼接(__dirname是当前项目路径) 拼接后为：C:\Users\euehs\Desktop\webpackStudy\dist
    //     // 打包后的输出路径为->当前项目下dist文件中中的bundle.js文件
    //     path: path.join(__dirname, 'dist'),
    //     filename: 'bundle.js'
    // },

    /*******多入口**********/
    entry: { // 多入口
        index: './src/index.js',
        search: './src/search.js'
    },
    // output没有单入口、多入口的区别
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name][chunkhash:8].js' // 使用chunkhash
    },
    mode: 'development',
    module: {
        rules: [
            { // js loader
                test: /.js$/,
                use: 'babel-loader' // 解析ES6
            },
            { // css loader
                test: /.css$/,
                use: [
                    /*
                     * 链式调用，从右到左调用。
                     * 先调用css-loader，加载.css文件，转换成commonjs对象
                     * 后调用style-loader，将样式通过<style>标签插入到head中
                     **/
                    'style-loader',
                    'css-loader'
                ]
            },
            { // less loader
                test: /.less$/,
                use: [
                    /*
                     * 链式调用，从右到左调用,
                     * 先调用less-loader，将lee转为css
                     * 再调用css-loader，将css转换成commonjs对象
                     * 之后调用style-loader，将样式通过<style>标签插入到head中
                     **/
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.{png|jpg|gif|jpeg}$/,
                // use: 'file-loader' // 使用file-loader解析图片
                use: { // 也可以使用url-loader解析图片，其中options可以设置图片大小
                    loader: 'url-loader', // url-loader内部也是使用file-loader
                    options: {
                        name:'img/[name][hash:8].[ext]', // 设置图片哈希
                        limit: 10240 // （字节）大小小于10240（10k）的时候，webpack自动做一个base64转换
                    }
                }
            }
        ]
    },
    watch: true, // 是否开启监听，默认false，不开启
    watchOptions: { // 只有开启监听模式，watchOptions才有意义
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化时通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll: 1000
    },
    plugins: [
        new webpack.MiniCssExtractPlugin({
            filename: '[name][contenthash:8].css'
        })
    ],
    devServer: {
        static: './dist',
        // static: {
        //     directory: './'
        //     // directory:path.join(__dirname,'dist')
        // },
        // contentBase: './dist', // webpack devServer服务的基础目录
        // hot: true // 开启热更新
        compress: true,
    },
}


