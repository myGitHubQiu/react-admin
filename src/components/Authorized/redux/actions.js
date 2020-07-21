// 引入api方法
import { getInfo, getMenu } from '@api/acl/login'

// 引入常量
import { GET_USER_INFO, GET_USER_MENU } from './constants'

// 获取用户信息的同步action
function getUserInfoSync (data) {
  return { type: GET_USER_INFO, data }
}
// 获取用户信息的异步action
export function getUserInfo () {
  return dispatch => {
    // 这里才是真正事件的处理函数
    // 调用api方法
    return getInfo().then(res => {
      // 调用同步action
      dispatch(getUserInfoSync(res))
      return res
    })
  }
}

// 获取菜单列表的同步action
function getUserMenuSync (data) {
  return { type: GET_USER_MENU, data }
}
// 获取菜单列表的异步action
export function getUserMenu () {
  return dispatch => {
    // 这里才是真正事件的处理函数
    // 调用api方法
    return getMenu().then(res => {
      // 调用同步action
      dispatch(getUserMenuSync(res.permissionList))
      return res.permissionList
    })
  }
}