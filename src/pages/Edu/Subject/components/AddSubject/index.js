import React, { Component } from 'react'

// 引入高阶组件connect
// import { connect } from 'react-redux'

// 引入card组件
import { Card, Button, Form, Input, Select, message } from 'antd'

// 引入Link
import { Link } from 'react-router-dom'

// 引入antd中的图标
import { ArrowLeftOutlined } from '@ant-design/icons'

// 
// import { getSubjectList } from '../../redux/index'
// 直接引入api获取数据的方法  不用redux数据
import { reqGetSubjectList, reqAddSubjectList } from '@api/edu/subject'

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


// 表单校验失败的回调函数
// const onFinishFailed = errorInfo => {
//   console.log('Failed:', errorInfo)
// }


// @connect(
//   // state是redux中所有数据 我只需要其中的subject数据
//   state => ({ subjectList: state.subjectList }),
//   { getSubjectList }
// )
class AddSubject extends Component {

  // 定义自己的state数据
  state = {
    subjectList: {
      total: 0,
      items: []
    }
  }

  // 用来存储后面请求下一次请求的数据
  page = 1

  // 挂载 获取最新redux数据
  async componentDidMount () {
    // this.props.getSubjectList(this.page++, 5)
    // this.page++
    // 通过api方法 获取数据
    const res = await reqGetSubjectList(this.page++, 5)
    // 更新数据 渲染界面
    this.setState({
      subjectList: res
    })
  }

  // 加载更多一级分类菜单
  handleloadMore = async () => {
    // this.props.getSubjectList(this.page++, 5)
    // 通过api方法 获取数据
    const res = await reqGetSubjectList(this.page++, 5)

    // 获取原来的数据
    // this.state.subjectList.items
    // 新的数据和老的数据拼接
    // res
    const newItems = [...this.state.subjectList.items, ...res.items]
    // 更新数据 渲染界面
    this.setState({
      subjectList: {
        total: res.total,
        items: newItems
      }
    })
  }

  // 新增课程
  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async values => {
    // console.log('Success:', values)
    try {
      await reqAddSubjectList(values.subjectname, values.parentid)
      message.success('新增课程成功')
      // 成功跳转
      this.props.history.push('/edu/subject/list')
    } catch{
      message.success('新增课程失败')
    }

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
            <span className='add-subject'>新增课程</span>
          </>
        }
      >
        <Form
          // 给表单中的表单项布局
          {...layout}
          name='subject'
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={this.onFinish}
        // 提交失败的时候会触发
        // onFinishFailed={onFinishFailed}
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
            <Select
              dropdownRender={menu => {
                return (
                  <>
                    {menu}
                    {this.state.subjectList.total > this.state.subjectList.items.length && (<button type='link' onClick={this.handleloadMore}> 加载更多 </button>)}

                  </>
                )
              }}
            >
              <Option value={0} key={0}>{'一级菜单'}</Option>
              {this.state.subjectList.items.map(subject => {
                return <Option value={subject._id} key={subject._id}>{subject.title}</Option>
              })}
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

export default AddSubject
