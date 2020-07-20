import React, { Component } from 'react'

import { Radio, Card, Button } from 'antd'

import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Legend,
  Annotation
} from "bizcharts"

import './index.less'

const data = [
  {
    type: "分类一",
    value: 20
  },
  {
    type: "分类二",
    value: 18
  },
  {
    type: "分类三",
    value: 32
  },
  {
    type: "分类四",
    value: 15
  },
  {
    type: "Other",
    value: 15
  }
];

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01;

// 自定义 other 的图形，增加两条线
registerShape("interval", "sliceShape", {
  draw (cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(["M", points[0].x, points[0].y]);
    path.push(["L", points[1].x, points[1].y - sliceNumber]);
    path.push(["L", points[2].x, points[2].y - sliceNumber]);
    path.push(["L", points[3].x, points[3].y]);
    path.push("Z");
    path = this.parsePath(path);
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path: path
      }
    });
  }
});

export default class Search extends Component {
  state = {
    // 要展示的数据
    value: ''
  }
  // 鼠标移上展示的数据
  intervalClick = e => {
    const value = e.data.data.value
    // 修改状态数据
    this.setState(state => {
      return {
        value: +state.value + value
      }
    })
  }

  handleRadioChange = e => {
    // console.log(e)
  }
  render () {
    // 右侧数据
    const extra = (
      <>
        <Radio.Group defaultValue='all' onChange={this.handleRadioChange}>
          <Radio.Button value='all'>全部渠道</Radio.Button>
          <Radio.Button value='line'>线上</Radio.Button>
          <Radio.Button value='shop'>门店</Radio.Button>
        </Radio.Group>
      </>
    )
    return (
      <div className='search'>
        <Card
          title='销售额类型占比'
          extra={extra}
        >
          <Chart data={data} height={400} autoFit onIntervalClick={this.intervalClick} >
            <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
            <Axis visible={false} />
            <Tooltip showTitle={false}>
              {(title, items) => {
                // 获取items的颜色
                const color = items[0].color
                // return的东西才是真正提示的东西
                return (
                  <div className='tooltip'>
                    <span className='dot' style={{ backgroundColor: color }}></span>
                    <span style={{ marginRight: 5 }}>{title}</span>
                    <span>{items[0].value}</span>
                  </div>
                )
              }}
            </Tooltip>
            <Interval
              adjust="stack"
              position="value"
              color="type"
              shape="sliceShape"
            />
            {/* 每点一个 上个会回来 */}
            {/* <Interaction type="element-single-selected" /> */}
            {/* 点击不会回来 */}
            <Interaction type="element-selected" />

            {/* 图例组件 */}
            <Legend position='top'></Legend>
            {/* 图形标注 */}
            <Annotation.Text
              position={['50%', '50%']}
              content="销售量"
              style={{
                textAlign: 'center',
                fontSize: 35,
                fontWeight: 500,
                fill: '#E8AEB3'
              }}
            // rotate={Math.PI * 0.09}
            />
            <Annotation.Text
              position={['50%', '35%']}
              content={this.state.value}
              style={{
                textAlign: 'center',
                fontSize: 26,
                fill: '#22A6F2'
              }}
            // rotate={Math.PI * 0.09}
            />
          </Chart>
        </Card>
      </div>
    )
  }
}
