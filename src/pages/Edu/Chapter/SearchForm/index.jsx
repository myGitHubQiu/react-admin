import React, { useEffect, useState } from "react";
import { Form, Select, Button, message } from "antd";

// 引入高阶组件connect
import { connect } from 'react-redux'

// 引入api
import { reqGetCourseList } from '@api/edu/course'

// 引入异步api方法
import { getChapterList } from '../redux/index'

import "./index.less";

const { Option } = Select;

function SearchForm (props) {

  // 
  const [courseList, setCourseList] = useState([])

  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };

  // 获取课程列表数据
  useEffect(() => {
    // 模拟componentDidmount
    async function fetchData () {
      const res = await reqGetCourseList()
      // 给课程列表赋值
      setCourseList(res)
    }
    // 手动调用
    fetchData()
  }, [])

  // 根据课程id获取章节数据
  const handleGetChapterList = async (value) => {
    console.log(value)
    const data = {
      page: 1,
      limit: 10,
      courseId: value.courseId
    }
    console.log(data)
    await props.getChapterList(data)
    message.success('课程章节列表数据获取成功')
  }

  return (
    <Form layout="inline" form={form} onFinish={handleGetChapterList}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map(course => (<Option key={course._id} value={course._id}>{course.title}</Option>))}
          {/* <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}



export default connect(null, { getChapterList })(SearchForm);
