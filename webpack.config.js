// 引入node.js中的Path模块
const path = require('path')
console.log(path.join(__dirname, 'dist'))
module.exports = {
    entry: './src/index.js',
    output: {
        // 进行路径拼接(__dirname是当前项目路径) 拼接后为：C:\Users\euehs\Desktop\webpackStudy\dist
        // 打包后的输出路径为->当前项目下dist文件中中的bundle.js文件
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'production'
}