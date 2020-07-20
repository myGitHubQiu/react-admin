import React, { Component } from 'react'

// 导入antd中栅格布局组件
import { Row, Col, Statistic, Progress } from 'antd'

// 引入项目中自己封装的card组件
import Card from '@comps/Card'

// 引入AreaChart面积图
import { AreaChart, ColumnChart } from 'bizcharts'

// 引入图标
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

// 面积图数据源
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 3.5 },
  { year: '1993', value: 4 },
  { year: '1994', value: 8 },
  { year: '1995', value: 4 },
  { year: '1996', value: 3.5 },
  { year: '1997', value: 8 },
  { year: '1998', value: 4 },
  { year: '1999', value: 3.5 },
]

// 柱状数据源
const columnData = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
]


const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示元素在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

export default class Analysis extends Component {
  // 定义骨架状态数据
  state = {
    loading: false
  }

  // 挂载时
  componentDidMount () {
    // 请求之前，改变展示
    this.setState({
      loading: true
    })

    // 拿到数据之后
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 2000)
  }

  render () {
    return (
      <div>
        {/* gutter表示栅格之间的间隔 */}
        <Row gutter={[16, 16]}>
          {/* 第一项 */}
          <Col {...firstRowCol}>
            <Card
              // card标题
              title={
                <Statistic title='总销售额' value={112893} prefix='￥' />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              {/*  Card组件中子节点 是Card的正文部分 */}
              <span>
                周同比 12% <CaretUpOutlined style={{ color: '#cf1322' }} />
              </span>
              <span style={{ marginLeft: 15 }}>
                日同比 10% <CaretDownOutlined style={{ color: '#3f8600' }} />
              </span>
            </Card>
          </Col>

          {/* 第二项 */}
          <Col {...firstRowCol}>
            <Card
              // card标题
              title={
                <Statistic title='访问量' value={6666666} />
              }
              footer={<span>日访问量 666</span>}
            >
              {/*  Card组件中子节点 是Card的正文部分 */}
              <AreaChart
                data={data}
                // title={{
                //   visible: true,
                //   text: '面积图',
                // }}
                xField='year'
                yField='value'
                xAxis={{
                  visible: false
                }}
                yAxis={{
                  visible: false
                }}
                smooth={true}
                padding={'0'}
                forceFit={true}
                color={['hotpink']}
              />
            </Card>
          </Col>

          {/* 第三项 */}
          <Col {...firstRowCol}>
            <Card
              // card标题
              title={
                <Statistic title='支付笔数' value={999999} />
              }
              footer={<span>转化率 60%</span>}
            >
              <ColumnChart
                data={columnData}
                // title={{
                //   visible: true,
                //   text: '基础柱状图',
                // }}
                xAxis={{
                  visible: false
                }}
                yAxis={{
                  visible: false
                }}
                forceFit
                padding='0'
                xField='type'
                yField='sales'
                // 别名
                meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}
              />
            </Card>
          </Col>

          {/* 第四项 */}
          <Col {...firstRowCol}>
            <Card
              // card标题
              title={
                <Statistic title='运营结果' value={112893} />
              }
              footer={<span>进度条 80.9%</span>}
              // 增加骨架组件 就是刚刚打开页面还没有拿到数据的时候展示骨架 拿到数据后渲染页面
              loading={this.state.loading}
            >
              {/*  Card组件中子节点 是Card的正文部分 */}
              <Progress
                //进度条颜色
                // 对象表示渐变色
                // 写一个颜色值的字符串表示单一颜色
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068'
                }}
                // 进度
                percent={80.9}
                // 闪烁效果
                status='active'
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
