const http = require('http')
const fs = require('fs')

const port = 3000
http
  .createServer((req, res) => {
    console.log('req.url', req.url)
    //   发送请求 转发http://ttapi.research.itcast.cn
    //  H   N   S
    const html = fs.readFileSync('./cors.html')
    res.end(html)
  })
  .listen(port, () => {
    console.log(`服务启动在：${port} 端口`)
  })
