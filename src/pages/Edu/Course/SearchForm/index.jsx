import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";

// 引入 获取所有讲师列表的api
import { reqGetAllTeacherList } from '@api/edu/teacher'

// 引入 获取所有一级分类课程数据的api
import { reqAllSubjectList } from '@api/edu/subject'

import "./index.less";

const { Option } = Select;

function SearchForm () {
  const [form] = Form.useForm();

  // 函数组件没有state存储数据 要使用useState
  // 定义存储讲师状态数据
  const [teacherList, setTeacherList] = useState([])
  // 定义存储一级分类课程数据
  const [subjectList, setSubjectList] = useState([])

  // 这是函数组件 要用useEffect模拟componentDidMount 组件挂载
  useEffect(() => {
    // console.log(111)
    async function fetchData () {
      // 调用异步api 而函数组件useEffect不能直接使用异步async
      // 所有定义个函数
      // console.log(222)
      // 获取所有教师列表数据
      // const teacher = await reqGetAllTeacherList()
      // 获取所有一级分类课程数据
      // const subject = await reqAllSubjectList()

      // 统一发送请求
      const [teachers, subjects] = await Promise.all([
        reqGetAllTeacherList(),
        reqAllSubjectList()
      ])
      //  把得到的数组放到状态数据里面
      setTeacherList(teachers)
      setSubjectList(subjects)
    }
    fetchData()
    // 这个[]表示只模拟componentDidMount
  }, [])

  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false
  //   }
  // ]);

  // 由于使用了cascader组件  我们需要将subjectList中的数据结构
  // 改成cascader组件的数据结构
  const options = subjectList.map(subject => {
    return {
      value: subject._id,
      label: subject.title,
      // false表示有子数据
      isLeaf: false
    }
  })

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = selectedOptions => {
    // const targetOption = selectedOptions[selectedOptions.length - 1];
    // targetOption.loading = true;

    // // load options lazily
    // setTimeout(() => {
    //   targetOption.loading = false;
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: "dynamic1"
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: "dynamic2"
    //     }
    //   ];
    //   setOptions([...options]);
    // }, 1000);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(item => (
            <Option value={item._id} key={item._id}>
              {item.name}
            </Option>
          ))}
          {/* <Option value="lucy1">Lucy1</Option>
          <Option value="lucy2">Lucy2</Option>
          <Option value="lucy3">Lucy3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          // 多级菜单数据
          options={options}
          // 当点击某一项的时候触发 可以得到下一级数据
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
