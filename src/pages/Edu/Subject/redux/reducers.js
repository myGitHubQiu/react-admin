import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function subjectList (prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      // 增加children属性
      action.data.items.forEach(items => {
        items.children = []
      })
      return action.data

    case GET_SECSUBJECT_LIST:
      // 判断是否有二级分类  有才展开  没有什么都不做
      if (action.data.items.length > 0) {
        // 1.获取一级分类ID
        const parentId = action.data.items[0].parentId
        // 2.找到对应的一级分类数据 并遍历 prevState原数据
        prevState.items.forEach(item => {
          // 找到对应的一级分类
          if (item._id === parentId) {
            // 给一级分类的children赋值
            item.children = action.data.items
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
