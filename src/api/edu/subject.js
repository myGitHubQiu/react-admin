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

// 更新课程分类 api 方法
export function reqUpdateSubjectList (id, title) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      id,
      title
    }
  })
}

// 删除课程分类 api 方法
export function deleteSubject (id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
    data: {
      id
    }
  })
}

// 获取所有一级课程分类数据
export function reqAllSubjectList () {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  })
}
