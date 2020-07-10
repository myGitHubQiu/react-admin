import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// 现在要从mock上面获取数据
// const MOCK_URL = `http://localhost:8888/${BASE_URL}`

// 获取讲师
export function reqGetSubjectList (page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
