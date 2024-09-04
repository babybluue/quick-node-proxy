const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { createProxyMiddleware } = require('http-proxy-middleware')

dotenv.config()

// 目标服务器地址
const target = process.env.TARGET_URL

const app = express()
app.use(cors())

app.use((req, res, next) => {
  console.log('--- New Request ---')
  console.log(`Method: ${req.method}`)
  console.log(`URL: ${req.url}`)
  console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`)
  console.log('-------------------')
  next() // 继续处理请求
})

// 创建代理中间件
app.use(
  '/',
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
  })
)

// 启动服务器
const PORT = 3000
const HOST = '0.0.0.0'
app.listen(PORT, HOST, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`)
})
