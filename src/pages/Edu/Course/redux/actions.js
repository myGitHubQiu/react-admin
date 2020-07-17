// 引入常量
import { GET_COURSE_LIMIT_LIST } from './constants'
// 引入api
import { reqGetCourseLimitList } from '@api/edu/course'

// 获取分页课程数据的同步action方法
function getCourseListSync (data) {
  return {
    type: GET_COURSE_LIMIT_LIST,
    data
  }
}

// 获取分页课程数据的同步action方法
// data表示异步方法中需要的所有参数，包装在一个对象中
// data就是那个对象
export function getCourseList (data) {
  return dispatch => {
    // 调用api
    return reqGetCourseLimitList(data).then(res => {
      // 调用同步action
      dispatch(getCourseListSync(res))
      return res
    })
  }
}