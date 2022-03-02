// 引入node.js中的Path模块
const path = require('path')
const webpack = require('webpack') // 引入webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const glob = require('glob') // 加入glob
const setMPA = () => {
    const entry = {} // 定义入口
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js')) //匹配src下面的再层目录下的index.js文件

    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index] // 获取第index位置下的文件路径
        // .match返回[
        //   'src/index/index.js',
        //   'index',
        //   index: 36,
        //   input: 'C:/Users/euehs/Desktop/webpackStudy/src/index/index.js',
        //   groups: undefined
        // ]其中第二个为我们需要的名字
        const match = entryFile.match(/src\/(.*)\/index\.js/)
        const pageName = match && match[1]
        entry[pageName] = entryFile

        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`), // HtmlWebpackPlugin模板所在位置
                filename: `${pageName}.html`, // 指定打包出来的html的名称
                chunks: [pageName], // 生成的html要使用哪些chunks
                inject: true, // 打包的js css 会自动注入的html中
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            }))
    })

    return {
        entry,
        htmlWebpackPlugins
    }
}

const {entry, htmlWebpackPlugins} = setMPA()

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
    entry: entry,
    // output没有单入口、多入口的区别
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js' // 使用chunkhash
    },
    mode: 'production',
    // mode: 'none',
    // mode: 'development',
    module: {
        rules: [
            { // js loader
                test: /.js$/,
                use: 'babel-loader' // 解析ES6
            },
            { // css loader
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "px2rem-loader",
                        options: {
                            remUnit: 75, //一个rem75px
                            remPrecision: 8 // px转rem后的小数点位数
                        }
                    }
                ]
            },
            { // less loader
                test: /.less$/,
                use: [
                    /*
                     * 链式调用，从右到左调用,
                     * 先调用postcss-loader,添加前缀，之后调用less-loader，将lee转为css
                     * 再调用css-loader，将css转换成commonjs对象
                     * 之后调用MiniCssExtractPlugin.loader,将样式提取出去
                     **/
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "px2rem-loader",
                        options: {
                            remUnit: 75, //一个rem75px
                            remPrecision: 8 // px转rem后的小数点位数
                        }
                    }
                ]
            },
            {
                test: /.{png|jpg|gif|jpeg}$/,
                // use: 'file-loader' // 使用file-loader解析图片
                use: { // 也可以使用url-loader解析图片，其中options可以设置图片大小
                    loader: 'url-loader', // url-loader内部也是使用file-loader
                    options: {
                        name: 'img/[name]_[hash:8].[ext]', // 设置图片哈希
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
        // 自动清理构建产物（默认会删除output指定的目录（dist目录））
        new CleanWebpackPlugin(),

        // css hash
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),

        // css代码压缩
        new OptimizeCssAssetsWebpackPlugin(),

        // html代码压缩
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/search.html'), // HtmlWebpackPlugin模板所在位置
        //     filename: "search.html", // 指定打包出来的html的名称
        //     chunks: ['search'], // 生成的html要使用哪些chunks
        //     inject: true, // 打包的js css 会自动注入的html中
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         removeComments: false
        //     }
        // }),
        //
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/index.html'), // HtmlWebpackPlugin模板所在位置
        //     filename: "index.html", // 指定打包出来的html的名称
        //     chunks: ['index'], // 生成的html要使用哪些chunks(index 代表引入index.js，与入口配置的index相同)
        //     inject: true, // 打包的js css 会自动注入的html中
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true, // 清理空格、换行符
        //         preserveLineBreaks: false, // 是否保留换行符（false）
        //         minifyCSS: true, // 压缩html内样式
        //         minifyJS: true, // 压缩html内js
        //         removeComments: false // 是否清理注释（false）
        //     }
        // }),
    ].concat(htmlWebpackPlugins), //在plugins中，加入我们的htmlWebpackPlugins
    // devtool: 'eval', // 生成eval包裹代码块
    devtool: 'source-map', // 生成.map文件
    // devtool: 'inline-source-map', // 将.map作为DataUrl嵌入，不单独生成.map
}

