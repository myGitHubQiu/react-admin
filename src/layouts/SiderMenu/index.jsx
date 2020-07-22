import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd'
import { defaultRoutes } from '@conf/routes'

import Icons from '@conf/icons'

const { SubMenu } = Menu

@withRouter
@connect(state => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  // 定义一个函数，在函数中遍历数组，动态渲染左侧菜单
  // 遍历两个数组，这个函数要调用两次
  renderMenu = menus => {
    // menu就是要传进来的数组
    // 这个return是将renderMenu得到的新数组返回出去
    return menus.map(menu => {
      const Icon = Icons[menu.icon]
      // 先判断该菜单是否要展示 true不展示 false展示
      if (menu.hidden) return
      // 下面是要展示的
      // 判断是否有children
      if (menu.children && menu.children.length > 0) {
        // 有二级菜单
        return (
          <SubMenu key={menu.path} icon={<Icon />} title={menu.name}>
            {menu.children.map(secMenu => {
              if (secMenu.hidden) return
              return (
                // key= secMenu.path-->key= menu.path + secMenu.path
                // 这里的key也要改 为了高亮
                <Menu.Item key={menu.path + secMenu.path}>
                  {/* 一级的path跟二级的path拼接 */}
                  <Link to={menu.path + secMenu.path}>{secMenu.name}</Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        // 只有一级菜单
        // 这里的return 是给新得到的数组添加一个菜单组件
        return (
          <Menu.Item key={menu.path} icon={<Icon />}>
            {/* 判断一级菜单是否是'/' */}
            {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.name}
          </Menu.Item>
        )
      }
    })
  }
  render () {
    // 拿到location中的pathname  pathname就是我们地址栏中的地址
    const path = this.props.location.pathname
    // 展开
    const reg = /[/][a-z]*/
    const firstPath = path.match(reg)[0]
    return (
      <>
        {/* 
        在这里我们要遍历两个数组  
        1.config/routes.js/defaultRoutes==>登陆之后的首要 这里没有children
        2.redux中的permissionList==>权限管理 教育管理 个人管理
      */}
        <Menu
          theme='dark'
          // defaultSelectedKeys实现高亮
          defaultSelectedKeys={[path]}
          // 实现展开项 用defaultOpenKeys
          defaultOpenKeys={[firstPath]}
          mode='inline'
        >
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
          {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
            Option 1
            </Menu.Item>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            Option 2
            </Menu.Item>
          <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<FileOutlined />} /> */}
        </Menu>
      </>
    )
  }
}
export default SiderMenu