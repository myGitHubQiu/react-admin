// 引入常量
import { GET_CHAPTER_LIST } from './constants'

// 定义state数据
const initChapterList = {
  total: 0,
  items: []
}
export default function chapterList (prevState = initChapterList, action) {
  switch (action.type) {
    case GET_CHAPTER_LIST:
      return action.data
    default:
      return prevState
  }
}