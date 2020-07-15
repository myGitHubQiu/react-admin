import React, { Component } from 'react'

// 引入card组件
import { Upload, Button, message } from 'antd'

// 引入antd中的图标
import { UploadOutlined } from '@ant-design/icons'

// 引入获取七牛云的token 的api方法
import { reqGetQiniuToken } from '@api/edu/lesson'

// 引入七牛云
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

// 定义常量存储视频大小
const MAX_VIDEO_SIZE = 20 * 1024 * 1024

export default class MyUpload extends Component {
  // 定义构造函数
  // 只是从缓存中获取数据和定义状态
  constructor() {
    super()
    //一进来要从缓存中获取有没有token
    const str = localStorage.getItem('upload_token')
    // 判断
    if (str) {
      // 如果有内容 说明之前存储过token
      const res = JSON.parse(str)
      this.state = {
        expires: res.expires,
        uploadToken: res.uploadToken
      }
    } else {
      this.state = {
        expires: 0,
        uploadToken: ''
      }
    }
  }

  // 上传视频前调用
  handleBeforeUpload = (file, fileList) => {
    // file就是我们要上传的文件
    // 1.限制视频大小
    return new Promise(async (resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.error('视频不能超过20M')
        reject()
        // 视频过大  后面就不执行了
        return
      }
      // 在请求之前 判断token是否过期
      if (Date.now() > this.state.expires) {
        // 过期了就发送请求
        const { uploadToken, expires } = await reqGetQiniuToken()
        // 将数据存储起来
        // state里面有最新的数据 本地缓存中也会有最新的数据
        this.saveUploadToken(uploadToken, expires)
      }
      resolve(file)
    })
  }

  // 存储uploadToken和过期时间的方法
  saveUploadToken = (uploadToken, expires) => {
    //  1.发送请求获取数据
    // const res = await reqGetQiniuToken()
    // console.log(res)
    // 获取token时间 加上 时间周期 得到目标过期时间
    const targetTime = Date.now() + expires * 1000 - 2 * 60 * 1000
    expires = targetTime
    // 2.存储到本地缓存中
    // localStorage里面不能直接存储对象 只能存储字符串
    const upload_token = JSON.stringify({ uploadToken, expires })
    localStorage.setItem('upload_token', upload_token)
    // 3.存储到state中
    this.setState({
      uploadToken,
      expires
    })
  }

  // 真正上传视频时调用 
  handleCustomRequest = (value) => {
    // console.log('上传了')
    // console.log(this.state.uploadToken)
    // 创建putExtra对象
    const file = value.file

    const key = nanoid(10) + 'fuge'

    // token 需要给本地服务器发送请求获取 (时效两个小时)
    const token = this.state.uploadToken

    // 前台 控制不是视频文件的文件不会显示在上传列表中
    const putExtra = {
      // 上传所有格式的视频 
      mimeType: ['video/*']
    }
    // 创建config对象 控制上传到哪个区 z2是华南区
    const config = {
      region: qiniu.region.z2
    }

    const observable = qiniu.upload(file, key, token, putExtra, config)
    // 创建上传过程触发回调函数的对象
    const observer = {
      //上传过程中触发的回调函数
      next (res) {
        console.log(res)
        // res.total是一个对象 并且有percent属性  所以可以展示进度条
        value.onProgress(res.total)
      },
      //上传失败触发的回调函数
      error (err) {
        console.log(err)
        value.onError(err)
      },
      // 上传成功触发的回调函数
      complete: (res) => {
        console.log(res)
        value.onSuccess(res)
        // console.log(this.props)
        this.props.onChange('http://qdcdb1qpp.bkt.clouddn.com/' + res.key)
      }
    }
    // 上传开始
    this.subscription = observable.subscribe(observer)
  }
  // 如果组件卸载  上传取消
  componentWillUnmount () {
    // 上传取消
    this.subscription && this.subscription.unsubscribe()
  }

  render () {
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
          // 前台 控制不是视频文件的文件不会显示在上传列表中
          accept='video/*'
        >
          <Button>
            <UploadOutlined /> 上传视频
              </Button>
        </Upload>
      </div>
    )
  }
}


