// 引入react
import React, { Component } from "react";

// 引入按钮 表格
import { Button, Table } from 'antd';

// 引入ant中的 +号图标 编辑图标 删除图片 
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'

// 引入api方法
import { reqGetSubjectList } from '@api/edu/subject'

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
        <Button type='primary' className='update-btn'>
          <FormOutlined />
        </Button>
        {/* 删除按钮 */}
        <Button type='danger'>
          <DeleteOutlined />
        </Button>
      </>
    ),
    width: 200
  }
]

// 后台数据
const data = [
  {
    key: 1,
    name: '前端',
    age: 32,
    address: '宝安大道西部硅谷大厦B座C区113尚硅谷',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: '后端',
    age: 42,
    address: '宝安大道西部硅谷大厦B座C区113尚硅谷',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: '运维',
    age: 32,
    address: '宝安大道西部硅谷大厦B座C区113尚硅谷',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  },
  {
    key: 4,
    name: '大数据',
    age: 32,
    address: '宝安大道西部硅谷大厦B座C区113尚硅谷',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  },
  {
    key: 5,
    name: 'Not Expandable',
    age: 29,
    address: '宝安大道西部硅谷大厦B座C区113尚硅谷',
    description: 'This not expandable'
  },
]

export default class Subject extends Component {

  // 定义状态数据
  state = {
    subject: {}
  }

  // 挂载成功后 请求数据 跟新数据
  async componentDidMount () {
    // 调用api方法 获取数据
    const res = await reqGetSubjectList(1, 10)
    // console.log(res)
    //  修改状态数据  展示视图
    this.setState({
      subject: res
    })
  }

  render () {
    return <div className='subject'>
      <Button type="primary" className='subject-btn'><PlusOutlined />新建</Button>
      <Table
        // 表头列数据
        columns={columns}
        // 表示是否可以展示
        expandable={{
          // 表示展开之后展示的内容
          expandedRowRender: record => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          // 表示行是否可以展开, true展开, false不展开
          rowExpandable: record => record.name !== 'Not Expandable'
        }}
        // 表格中每一行数据
        dataSource={this.state.subject.items}

        // 修改默认key
        rowKey='_id'
        // 分页功能
        pagination={{
          //total表示数据总数
          total: this.state.subject.total,
          //是否显示快速跳转
          showQuickJumper: true,
          // 是否显示修改每页显示数据数量
          showSizeChanger: true,
          //设置每天显示数据数量的配置项
          pageSizeOptions: ['10', '15', '20'],
          //每页默认显示数据条数 默认是10,
          defaultPageSize: 5,
          //页码改变的时候触发,
          onchange: (page, size) => { },
          //一页展示几条数据变化时触发 current 当前页码, size 一页几条
          onShowSizeChange: (current, size) => { }
        }}
      />
    </div>;
  }
}
