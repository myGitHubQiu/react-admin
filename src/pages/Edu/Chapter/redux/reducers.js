// 引入常量
import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constants'

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
    default:
      return prevState
  }
}