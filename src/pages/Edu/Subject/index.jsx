// 引入react
import React, { Component } from "react";

// 引入按钮 表格
import { Button, Table, Tooltip } from 'antd';

// 引入ant中的 +号图标 编辑图标 删除图片 Tooltip->文字提醒功能
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'

// 引入connect  高阶组件 返回容器组件
import { connect } from 'react-redux'

// 引入api方法
// import { reqGetSubjectList } from '@api/edu/subject'

// 引入异步请求数据的action方法  getSecSubjectList
import { getSubjectList, getSecSubjectList } from './redux/index'

// 引入样式文件
import './index.css'

// 表格列数据
const columns = [
  {
    title: '分类名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'action',

    // 每一列默认展示文本,如果要展示其他内容,使用render属性
    render: () => (
      <>
        {/* 编辑按钮 */}
        <Tooltip title="点我编辑">
          <Button type='primary' className='update-btn'>
            <FormOutlined />
          </Button>
        </Tooltip>

        {/* 删除按钮 */}
        <Tooltip title="点我删除">
          <Button type='danger'>
            <DeleteOutlined />
          </Button>
        </Tooltip>

      </>
    ),
    width: 200
  }
]


// redux数据状态
@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, getSecSubjectList }
)

class Subject extends Component {
  // 设置默认高亮显示页码
  currentPage = 1

  // 定义状态数据  用redux管理数据了
  // state = {
  //   subject: {}
  // }

  // 挂载成功后 请求数据 跟新数据
  componentDidMount () {
    // this.getSubjectList(1, 10)  这里是普通数据

    // 这里是redux管理的数据
    this.props.getSubjectList(1, 5)
  }

  // 封装reqGetSubjectList方法  这里自定义获取数据的异步请求的方法 
  // 这里通过mock模拟请求数据  
  // getSubjectList = async (page, limit) => {
  //   // 调用api方法 获取数据
  //   const res = await reqGetSubjectList(page, limit)
  //   // console.log(res)
  //   //  修改状态数据  展示视图
  //   this.setState({
  //     subject: res
  //   })
  // }

  // 显示第几页 一页显示几条
  handleChange = (page, pageSize) => {
    // 显示第几页 一页显示几条
    // this.getSubjectList(page, pageSize)

    // 用redux管理数据
    this.props.getSubjectList(page, pageSize)
    // 高亮显示与实际页码数 保持一致
    this.currentPage = page
  }

  // 修改一页显示几条数据的方法
  handleSizeChange = (current, size) => {
    // 修改一页显示几条数据
    // this.getSubjectList(current, size)

    // 用redux管理的数据
    this.props.getSubjectList(current, size)
    // 高亮显示与实际页码数 保持一致
    this.currentPage = current
  }

  // 路由跳转到新增
  handleGoAddSubject = () => {
    // console.log(this.props)
    this.props.history.push('/edu/subject/add')
  }

  // 控制可展开项
  // expanded是否有展开  true为有  
  // record当前这行数据
  handleClickExpand = (expanded, record) => {
    // console.log(expanded, record)
    if (expanded) {
      // 如果有expanded 就发送请求 获取二级菜单数据
      this.props.getSecSubjectList(record._id)
    }
  }

  render () {
    return <div className='subject'>
      <Button
        type="primary"
        className='subject-btn'
        onClick={this.handleGoAddSubject}><PlusOutlined
        />
      新建
      </Button>
      <Table
        // 表头列数据
        columns={columns}
        // 表示是否可以展示
        expandable={{
          // 表示展开之后展示的内容
          // expandedRowRender: record => (
          //   <p style={{ margin: 0 }}>{record.description}</p>
          // ),
          // // 表示行是否可以展开, true展开, false不展开
          // rowExpandable: record => record.name !== 'Not Expandable'

          // 我们要自己定义可展开项  上面的可展开项会有bug 会占用后面的一级分类位置
          // 通过增加一个children属性来得到可展开项（+）
          // onExpand-->点击展开图标时触发
          onExpand: this.handleClickExpand
        }}
        // 表格中每一行数据
        // dataSource={this.state.subject.items}
        // 这里要用redux管理的数据
        dataSource={this.props.subjectList.items}

        // 修改默认key
        rowKey='_id'
        // 分页功能
        pagination={{
          //total表示数据总数
          // total: this.state.subject.total,
          // 这里要用redux管理的数据
          total: this.props.subjectList.total,
          //是否显示快速跳转
          showQuickJumper: true,
          // 是否显示修改每页显示数据数量
          showSizeChanger: true,
          //设置每天显示数据数量的配置项
          pageSizeOptions: ['3', '5', '10', '15', '20'],
          //每页默认显示数据条数 默认是10,
          defaultPageSize: 5,
          //页码改变的时候触发,
          // onchange: (page, size) => { },
          //一页展示几条数据变化时触发 current 当前页码, size 一页几条
          // onShowSizeChange: (current, size) => { }
          onChange: this.handleChange,
          onShowSizeChange: this.handleSizeChange,
          // 高亮与实际页码数保持一致
          current: this.currentPage
        }}
      />
    </div>;
  }
}

export default Subject
