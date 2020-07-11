import { reqGetSubjectList, reqGetSecSubjectList } from "@api/edu/subject";

import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from "./constants";

// 这个是获取一级分类的同步代码
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list
});

// 这个是获取一级分类的异步代码
export const getSubjectList = ({ page, limit }) => {
  return (dispatch) => {
    return reqGetSubjectList({ page, limit }).then((response) => {
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
