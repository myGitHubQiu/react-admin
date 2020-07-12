import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// 现在要从mock上面获取数据
// const MOCK_URL = `http://localhost:8888/${BASE_URL}`

// 获取课程一级分类 api
export function reqGetSubjectList (page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET"
  })
}

// 获取课程二级分类 api
export function reqGetSecSubjectList (parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET"
  })
}

// 新增课程分类 api 方法
export function reqAddSubjectList (title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId
    }
  })
}
