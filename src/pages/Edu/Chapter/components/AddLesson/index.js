import React, { Component } from 'react'

// 引入高阶组件connect
// import { connect } from 'react-redux'

// 引入card组件
import { Card, Button, Form, Input, Switch, Upload, message } from 'antd'

// 引入Link
import { Link } from 'react-router-dom'

// 引入antd中的图标
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'


// 引入样式
import './index.less'

//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 输入框 表单项部分
  wrapperCol: {
    span: 6
  }
}

// @connect(
//   // state是redux中所有数据 我只需要其中的subject数据
//   state => ({ subjectList: state.subjectList }),
//   { getSubjectList }
// )
class AddLesson extends Component {

  // 新增课时
  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = values => {

  }

  render () {
    return (
      // card卡片 组件
      <Card
        title={
          <>
            {/* to = 跳转到subject列表界面 */}
            <Link to='edu/subject/list'>
              {/* 返回图标 */}
              <ArrowLeftOutlined />
            </Link>
            <span className='add-lesson'>新增课时</span>
          </>
        }
      >
        <Form
          // 给表单中的表单项布局
          {...layout}
          name='lesson'
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={this.onFinish}
          // 提交失败的时候会触发
          // onFinishFailed={onFinishFailed}

          initialValues={{
            // 键就是表单项的name属性的值
            lessonname: '哈哈',
            free: true
          }}
        >
          {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
          <Form.Item
            // 表示提示文字
            label='课时分类名称'
            // 表单项提交时的属性
            name='lessonname'
            // 校验规则
            rules={[
              {
                required: true,
                // 校验不通过时的提示文字
                message: '请输入课时分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='是否免费'
            name='free'
            rules={[
              {
                required: true,
                message: '请选择是否免费'
              }
            ]}
            // 默认表单控制表单项的属性值是value,但是switch的值不是value,是checked,所以要改成checked
            valuePropName='checked'
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            />
          </Form.Item>

          <Form.Item
            label='上传视频'
            name='video'
            rules={[
              {
                required: true,
                message: '请选择上传视频'
              }
            ]}
          >
            <Upload>
              <Button>
                <UploadOutlined /> 上传视频
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            {/* htmlType表示这个按钮是表单内的提交按钮 */}
            <Button type='primary' htmlType='submit'>
              submit
            </Button>
          </Form.Item>
        </Form>

      </Card>
    )
  }
}

export default AddLesson

