import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取课程所有列表 api
export function reqGetCourseList () {
  return request({
    url: `${BASE_URL}`,
    method: "GET"
  })
}

// 获取分页课程数据 api
export function reqGetCourseLimitList ({ page, limit, title, teacherId, subjectId, subjectParentId }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      title,
      teacherId,
      subjectId,
      subjectParentId
    }
  })
}
