import React, { Component } from 'react'

// 引入高阶组件
import { connect } from 'react-redux'

// 引入同步api
import { loginSuccessSync } from '@redux/actions/login'

@connect(null, { loginSuccessSync })
class Oauth extends Component {
  // 挂载
  componentDidMount () {
    // 1.获取token
    const token = window.location.search.split('=')[1]
    // 2.在redux存储token
    this.props.loginSuccessSync({ token })
    // 3.在本地存储token
    localStorage.setItem('user_token', token)
    // 4.跳转到首页
    this.props.history.replace('/')
  }
  render () {
    return (
      <div>
        权限验证中...
      </div>
    )
  }
}
export default Oauth
