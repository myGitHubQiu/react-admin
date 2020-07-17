import React, { Component } from 'react'

// 导入antd中栅格布局组件
import { Row, Col, Statistic } from 'antd'

// 引入项目中自己封装的card组件
import Card from '@comps/Card'

// 引入图标
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示元素在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

export default class Analysis extends Component {
  render () {
    return (
      <div>
        {/* gutter表示栅格之间的间隔 */}
        <Row gutter={[16, 16]}>
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
        </Row>
      </div>
    )
  }
}
