import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

import './index.less'
import SiderMenu from '../SiderMenu/index'

import logo from '@assets/images/logo.png'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

// user数据在redux中 需要通过高阶组件connect拿到
@withRouter
@connect(
  state => ({ user: state.user })
)
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    // console.log(collapsed)
    this.setState({ collapsed })
  }
  render () {
    // 从高阶组件中的state中拿到了user中的name avatar,permissionList属性值
    let { name, avatar, permissionList } = this.props.user
    // console.log(this.props)

    // 获取浏览器地址栏中的路径
    const path = this.props.location.pathname
    // console.log(path) 拿到的是/ 或者 /edu/.../...
    // 把上面的路径正则匹配 g表示全部提取 不写g就提取符合的第一个
    const reg = /[/][a-z]*/g
    const allPath = path.match(reg)
    // console.log(allPath)   ["/acl", "/user", "/list"]
    // 把每个地址栏地址分割并得到
    // 获取一级path
    const firstPath = allPath[0]
    // 获取二级path的第一个
    const secPath = allPath[1]
    // 获取二级path的第二个 没有就返回空字符串
    const thirdPath = allPath[2] || ''
    // 遍历 查找对应的一级菜单名称和二级菜单名称 
    // 菜单名称在permissionList数据中
    let firstName
    let secName
    // 遍历一级菜单
    permissionList.forEach(item => {
      if (item.path === firstPath) {
        // 得到一级菜单名称
        firstName = item.name
        // 遍历二级菜单
        item.children.forEach(secItem => {
          if (secItem.path === secPath + thirdPath) {
            // 得到二级菜单名称
            secName = secItem.name
          }
        })
      }
    })
    return (
      <Layout className='layout'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo'>
            <img src={logo} alt='' />
            {/* <h1>硅谷教育管理系统</h1> */}
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          {/* <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<PieChartOutlined />}>
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
            <Menu.Item key='9' icon={<FileOutlined />} />
          </Menu> */}
          {/* 因为要写很多逻辑代码 所以把上面代码放到了SiderMenu中 */}
          <SiderMenu></SiderMenu>
        </Sider>

        <Layout className='site-layout'>
          <Header className='layout-header'>
            {/* 上面props中得到数据了 这里就可以直接使用 */}
            <img src={avatar} alt='logo图片' />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav'>
              {
                firstName === undefined ? '首页' :
                  <>
                    <Breadcrumb>
                      <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                      <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                    </Breadcrumb>
                  </>
              }

              <div className='secName'>{secName}</div>
            </div>

            <div className='layout-content'>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default PrimaryLayout