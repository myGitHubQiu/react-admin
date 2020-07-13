// 引入api
import {
  reqGetSubjectList,
  reqGetSecSubjectList,
  reqUpdateSubjectList
} from "@api/edu/subject";

import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST, UPDATE_SUBJECT } from "./constants";

// 这个是获取一级分类的同步代码
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list
});

// 这个是获取一级分类的异步代码
export const getSubjectList = (page, limit) => {
  // console.log(page, limit);
  return (dispatch) => {
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response))
      return response
    })
  }
}

// 这个是获取二级分类的同步代码
const getSecSubjectListSync = (list) => ({
  type: GET_SECSUBJECT_LIST,
  data: list
});

// 这个是获取二级分类的异步代码
export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSecSubjectList(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response))
      return response
    })
  }
}

// 这个是更新数据的同步action
const updateSubjectSync = (data) => ({
  type: UPDATE_SUBJECT,
  data
})
// 这个是更新数据的异步action
export const updateSubject = (id, title) => {
  return dispatch => {
    // 实现异步发送请求
    return reqUpdateSubjectList(id, title).then(res => {
      // 将redux数据修改完成
      dispatch(updateSubjectSync({ id, title }))
      return res
    })
  }
}
