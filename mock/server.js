// 1.引入express服务
const express = require('express')

// 2.通过express方法获取app对象
const app = express()

// 引入mockjs
const Mock = require('mockjs')

// 从Mock身上拿到Random
const Random = Mock.Random

//返回中文标题
Random.ctitle()

// 解决跨行
// use是express中的一个中间件
app.use((req, res, next) => {
  //设置响应头
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'content-type,token')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  //调用下一个中间件
  next()
})

// 模拟：发送请求获取数据
app.get('/admin/edu/subject/:page/:limit', (req, res) => {
  // req 请求数据
  // 通过params获取浏览器上传的路由参数
  let { page, limit } = req.params

  //定义data数据  死数据  要用mock模拟数据
  //   const data = {
  //     total: 20,
  //     items: [{},{}]
  //   }

  // 利用mock创建虚拟数据
  const data = Mock.mock({
    // 分类列表有几条数据
    total: Random.integer(+limit + 2, limit * 2),

    // items 真实的返回的数据
    ['items|' + limit]: [
      {
        // 每次加1 从1开始
        '_id|+1': 1,
        // 返回2-5个中文
        title: '@ctitle(2,5)',
        // 分类级别
        parentId: 0
      }
    ]
  })
  // res 响应数据
  res.json({
    code: 20000,
    success: true,
    data: data,
    message: ''
  })
})

// 3.开启服务
app.listen(8888, err => {
  if (err) {
    return console.log('服务开启失败')
  }
  console.log('服务开启成功,8888号为你服务~~')
})


