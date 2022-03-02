module.exports = {
    plugins: [
        require('autoprefixer')({
            // 浏览器最近的两个版本，使用人数大于百分之1，ios7以上
            overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
        })
    ]
}