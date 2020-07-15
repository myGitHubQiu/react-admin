// 引入常量
import { GET_CHAPTER_LIST, GET_LESSON_LIST, BATCH_DEL_CHAPTER, BATCH_DEL_LESSON } from './constants'
import Chapter from '..'

// 定义state数据
const initChapterList = {
  total: 0,
  items: []
}
export default function chapterList (prevState = initChapterList, action) {
  switch (action.type) {
    case GET_CHAPTER_LIST:
      // 给每条章节数据加个children属性 章节前面的加号
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data

    case GET_LESSON_LIST:
      // 将课时添加到对应的章节的children里
      // 从返回的数据中 获取chapterId
      if (action.data.length > 0) {
        const chapterId = action.data[0].chapterId
        prevState.items.forEach(chapter => {
          if (chapter._id === chapterId) {
            chapter.children = action.data
          }
        })
      }
      return {
        ...prevState
      }

    // 批量删除章节数据
    case BATCH_DEL_CHAPTER:
      // 1.需要知道要删除哪些数据
      let chapterIds = action.data
      // 2.遍历章节数据
      const newChapters = prevState.items.filter(chapter => {
        // 如果当前的chapter的id在chapterIds中  说明是要需要的数据
        if (chapterIds.indexOf(chapter._id) > -1) {
          return false
        }
        return true
      })
      return {
        ...prevState,
        items: newChapters
      }

    // 批量删除课时
    case BATCH_DEL_LESSON:
      // 1.获取所有奥需要的课时id
      let lessonIds = action.data
      // 2.遍历章节，找到对应的章节后，遍历章节的课时
      let chapterList = prevState.items
      // 遍历章节
      chapterList.forEach(chapter => {
        // 得到的chapter是每一个章节  找到每一个章节中的课时
        const newChildren = chapter.children.filter(lesson => {
          // lesson就是得到的课时
          if (lessonIds.indexOf(lesson._id) > -1) {
            return false
          }
          return true
        })
        // 给chapter的children重新赋值
        chapter.children = newChildren
      })
      return {
        ...prevState,
        items: chapterList
      }

    default:
      return prevState
  }
}