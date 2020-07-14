import React, { Component } from 'react'

// 引入card组件
import { Upload, message, Button } from 'antd'

// 引入antd中的图标
import { UploadOutlined } from '@ant-design/icons'

const MAX_VIDEO_SIZE = 20 * 1024 * 1024

export default class MyUpload extends Component {

  // 上传视频前调用
  handleBeforeUpload = (file, fileList) => {
    // file就是我们要上传的文件
    // 1.限制视频大小
    return new Promise((resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.error('视频不能超过20M')
        reject()
      }
      resolve(file)
    })

    // 2.请求上传的token
  }

  // 真正上传视频时调用 
  handleCustomRequest = () => {

  }

  render () {
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
        >
          <Button>
            <UploadOutlined /> 上传视频
              </Button>
        </Upload>
      </div>
    )
  }
}
