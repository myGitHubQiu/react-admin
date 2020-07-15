// 引入异步api接口
import { reqGetChapterList, reqBatchDelChapter } from '@api/edu/chapter'

// 引入获取所有课程数据的api
import { reqGetLessonList, reqBatchDelLesson } from '@api/edu/lesson'

// 引入常量
import { GET_CHAPTER_LIST, GET_LESSON_LIST, BATCH_DEL_CHAPTER, BATCH_DEL_LESSON } from './constants'

// 1-1.获取章节数据的同步方法
const getChapterListSync = (data) => ({
  type: GET_CHAPTER_LIST,
  data
})
// function getChapterListSync(data){
//   return {type:GET_CHAPTER_LIST,data}
// }

// 1-2.定义章节数据的异步方法
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

// 2-1.获取所有课程数据的同步方法
const getLessonListSync = (data) => ({
  type: GET_LESSON_LIST,
  data
})

// 2-2.获取所有课程数据的异步方法
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

// 3-1.定义删除章节的同步方法
// data就是要删除的章节的ids
const batchDelChapterSync = (data) => ({
  type: BATCH_DEL_CHAPTER,
  data
})
// 3-2.定义删除章节的异步方法
export const batchDelChapter = (chapterIds) => {
  return dispatch => {
    // 调用api方法
    return reqBatchDelChapter(chapterIds).then(res => {
      // 调用同步方法
      dispatch(batchDelChapterSync(chapterIds))
      return res
    })
  }
}

// 4-1.定义删除课时的同步方法
// data就是要删除的章节的ids
const batchDelLessonSync = (data) => ({
  type: BATCH_DEL_LESSON,
  data
})
// 4-2.定义删除课时的异步方法
export const batchDelLesson = (lessonIds) => {
  return dispatch => {
    // 调用api方法
    return reqBatchDelLesson(lessonIds).then(res => {
      // 调用同步方法
      dispatch(batchDelLessonSync(lessonIds))
      return res
    })
  }
}