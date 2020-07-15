// 引入异步api接口
import { reqGetChapterList } from '@api/edu/chapter'

// 引入获取所有课程数据的api
import { reqGetLessonList } from '@api/edu/lesson'

// 引入常量
import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constants'

// 获取章节数据的同步方法
const getChapterListSync = (data) => ({
  type: GET_CHAPTER_LIST,
  data
})

// 定义章节数据的异步方法
export const getChapterList = ({ page, limit, courseId }) => {
  return dispatch => {
    // 调用api方法
    return reqGetChapterList({ page, limit, courseId }).then(res => {
      // 调用同步方法
      dispatch(getChapterListSync(res))
      return res
    })
  }
}

// 获取所有课程数据的同步方法
const getLessonListSync = (data) => ({
  type: GET_LESSON_LIST,
  data
})

// 获取所有课程数据的异步方法
export const getLessonList = (chapterId) => {
  return dispatch => {
    // 调用api方法
    return reqGetLessonList(chapterId).then(res => {
      // 调用同步方法
      dispatch(getLessonListSync(res))
      return res
    })
  }
}