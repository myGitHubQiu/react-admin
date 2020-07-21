import React, { Component } from 'react'
// 引入高阶组件connect
import { connect } from 'react-redux'
// 引入api方法
import { getUserInfo, getUserMenu } from './redux/index'
// 引入Loading
import Loading from '@comps/Loading'

@connect(
  null,
  { getUserInfo, getUserMenu }
)
class Authorized extends Component {
  // 当页面一进来就会render（）这个时候componentDidMount还没拿到数据呢
  // 所以需要定义状态数据，当修改状态数据的时候，重新渲染界面，
  // 这个时候数据肯定是从redux中拿到了
  state = {
    loading: true
  }
  // 挂载成功
  async componentDidMount () {
    // 发送请求获取数据
    // this.props.getUserInfo()
    // this.props.getUserMenu()

    let { getUserInfo, getUserMenu } = this.props
    // 上面要发送两次请求 可以包裹一下，请求一次就好
    await Promise.all([getUserInfo(), getUserMenu()])
    // 修改状态数据
    this.setState({
      loading: false
    })
  }
  render () {
    // 拿到primaryLayout 这里是在src-layouts-index.js中拿到的
    let { loading } = this.state
    return loading ? <Loading></Loading> : this.props.render()
  }
}

export default Authorized
