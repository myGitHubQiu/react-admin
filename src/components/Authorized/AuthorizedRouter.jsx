import React, { Component, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'

import { defaultRoutes } from '@conf/routes'
import components from '@conf/asyncComps'
import { connect } from 'react-redux'

@connect(state => ({ permissionList: state.user.permissionList }))
class AuthorizedRouter extends Component {
  // 定义一个函数，在函数中遍历数据，拿到数据渲染主体界面
  renderRoute = (routes, parentPath) => {
    // routes就是传进来的数据，有一级的有二级的，
    // 先遍历一级的
    return routes.map(route => {
      // 判断有没有component
      if (route.component) {
        // 拿到对应的组件
        const Component = components[route.component]()
        return (
          <Route
            path={parentPath ? parentPath + route.path : route.path}
            // 拿到的是字符串 要转化一下
            component={Component}
            exact
            key={route.path}
          >
          </Route>
        )
      }
      // 如果有children属性,要渲染二级路由组件
      if (route.children && route.children.length) {

        return this.renderRoute(route.children, route.path)
      }
    })
  }
  render () {
    return (
      <Suspense fallback={<Spin />}>
        {this.renderRoute(defaultRoutes)}
        {this.renderRoute(this.props.permissionList)}
      </Suspense>
    )
  }
}

export default AuthorizedRouter
