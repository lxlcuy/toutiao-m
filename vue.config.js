module.exports = {
  devServer: {
    // 会将任何未知请求(没有匹配到的静态文件的请求，代理到要请求的网站)
    proxy: 'http://ttapi.research.itcast.cn'
  }
}
