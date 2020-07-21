
// 引入常量
import { GET_USER_INFO, GET_USER_MENU } from './constants'

// 定义数据
const initUserInfo = {
  // 用户名
  name: '',
  // 用户头像
  avatar: '',
  // 用户按钮权限列表
  permissionValueList: [],
  // 用户路由权限列表
  permissionList: []
}

export default function user (prevState = initUserInfo, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...prevState,
        ...action.data
      }
    case GET_USER_MENU:
      return {
        ...prevState,
        permissionList: action.data
      }
    default:
      return prevState
  }
}