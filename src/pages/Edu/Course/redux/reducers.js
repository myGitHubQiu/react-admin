// 引入常量
import { GET_COURSE_LIMIT_LIST } from './constants'
// 定义状态数据
const initCourseList = {
  total: 0,
  items: []
}
export default function courseList (prevState = initCourseList, action) {
  switch (action.type) {
    case GET_COURSE_LIMIT_LIST:
      // action.data拿到的数据格式: {total:0, items: []}  也就是prevState
      return action.data
    default:
      return prevState
  }
}