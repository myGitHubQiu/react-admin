import React, { Component } from 'react'

// 导入antd中栅格布局组件
import { Row, Col } from 'antd'

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
          <Col {...firstRowCol}>1</Col>
          <Col {...firstRowCol}>2</Col>
          <Col {...firstRowCol}>3</Col>
          <Col {...firstRowCol}>4</Col>
        </Row>
      </div>
    )
  }
}
