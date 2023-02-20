module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 就是要处理的文件路径中包含了vant关键字 处理的vant的样式
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
