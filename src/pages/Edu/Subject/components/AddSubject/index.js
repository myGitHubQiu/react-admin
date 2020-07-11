import React, { Component } from 'react'

// 引入card组件
import { Card, Button, Form, Input, Select } from 'antd'

// 引入Link
import { Link } from 'react-router-dom'

// 引入antd中的图标
import { ArrowLeftOutlined } from '@ant-design/icons'

// 引入样式
import './index.css'


// 获取Option组件
const Option = Select.Option

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

// 点击添加按钮,表单校验成功之后的回调函数
const onFinish = values => {
  console.log('Success:', values)
}
// 表单校验失败的回调函数
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}

export default class AddSubject extends Component {
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
            <span className='add-subject'>新增课程</span>
          </>
        }
      >
        <Form
          // 给表单中的表单项布局
          {...layout}
          name='subject'
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={onFinish}
          // 提交失败的时候会触发
          onFinishFailed={onFinishFailed}
        >
          {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
          <Form.Item
            // 表示提示文字
            label='课程分类名称'
            // 表单项提交时的属性
            name='subjectname'
            // 校验规则
            rules={[
              {
                required: true,
                // 校验不通过时的提示文字
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select>
              <Option value={1}>{'一级菜单'}</Option>
            </Select>
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
