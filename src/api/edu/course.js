import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取课程所有列表 api
export function reqGetCourseList () {
  return request({
    url: `${BASE_URL}`,
    method: "GET"
  })
}