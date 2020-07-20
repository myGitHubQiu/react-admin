import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "@redux/actions/login";
// 手机登陆异步action
import { mobilelogin } from "@redux/actions/login";

// 引入获取验证码api方法
import { reqGetVerifyCode } from '@api/acl/oauth'

import "./index.less";
// import { useForm } from "antd/lib/form/Form";

const { TabPane } = Tabs;

// @withRouter
// @connect(null, {
//   login,
// })
let downCount = 5
function LoginForm (props) {

  // 通过From.useFrom实例得到from对象
  const [form] = Form.useForm()

  // 定义状态数据，控制验证码是否展示或隐藏
  const [isShowDownCount, setIsShowDownCount] = useState(false)
  // 定义状态数据，控制倒计时时间
  let [, setDownCount] = useState(5)
  // 定义状态数据 看当前是用户名登陆还是手机登陆
  const [activeKey, setActiveKey] = useState('user')

  // const onFinish = ({ username, password }) => {
  // props.login(username, password).then((token) => {
  //   // 登录成功
  //   // console.log("登陆成功~");
  //   // 持久存储token
  //   localStorage.setItem("user_token", token);
  //   props.history.replace("/");
  // });
  // .catch(error => {
  //   notification.error({
  //     message: "登录失败",
  //     description: error
  //   });
  // });
  // };

  const onFinish = () => {
    console.log(11)
    console.log(activeKey)
    if (activeKey === 'user') {
      // 校验用户名和密码
      form.validateFields(['username', 'password']).then(res => {
        console.log(res)
        let { username, password } = res
        props.login(username, password).then((token) => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    } else {
      // 校验手机和验证码
      form.validateFields(['phone', 'verify']).then(res => {
        // console.log(res)
        let { phone, verify } = res
        props.mobilelogin(phone, verify).then((token) => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    }
  }

  // 密码校验
  const validator = (rule, value) => {
    return new Promise((resolve, reject) => {
      console.log(rule, value)
      if (!value) {
        return reject('密码不能为空')
      }
      if (value.length < 4) {
        return reject('密码不能小于4个字符')
      }
      if (value.length > 16) {
        return reject('密码不能大于16个字符')
      }
      if (!/^[0-9a-zA-Z_]+$/.test(value)) {
        return reject('密码只能是字母,数字,下划线')
      }
      resolve()
    })
  }

  // 获取验证码事件处理函数
  const getVerifyCode = async () => {
    // 1.通过from实例拿到validateFields()表单验证方法
    // validateFields	antd中触发表单验证
    const res = await form.validateFields(['phone'])
    console.log('成功', res)
    // 2.发送请求 获取验证码
    await reqGetVerifyCode(res.phone)

    // 3.发送请求之后 修改验证码等待时间的状态值
    // 第二步发送请求后 就要改变isShowDownCount的值
    setIsShowDownCount(true)
    // 定义一个定时器 修改倒计时时间
    let timeId = setInterval(() => {
      // 修改倒计时时间
      setDownCount(--downCount)
      // 判断
      if (downCount <= 0) {
        // 清除定时器
        clearInterval(timeId)
        // 取消禁用按钮
        setIsShowDownCount(false)
        // 重置初始状态值
        downCount = 5
      }

    }, 1000)
  }

  // tab切换触发的事件处理函数
  const handleTabChange = activeKey => {
    // console.log(activeKey)
    setActiveKey(activeKey)
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        // onFinish antd中提交表单且数据验证成功后回调事件
        onFinish={onFinish}
        // from实例与From表单连接
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          // 切换页签的时候触发
          onChange={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item
              name="username"
              // 用户名校验
              rules={[
                {
                  required: true,
                  message: '用户名不能为空'
                },
                {
                  min: 5,
                  message: '用户名不能少于5个字符'
                },
                {
                  max: 18,
                  message: '用户名不能大于18个字符'
                },
                {
                  // pattern	antd中正则表达式匹配
                  pattern: /^[0-9a-zA-Z_]+$/,
                  message: '用户名只能是字母,下划线,数字'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ validator: validator }]}
            >
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item
              name="phone"
              // 手机校验
              rules={[
                {
                  // 必填项
                  required: true,
                  // 提示信息
                  message: '请输入手机号码'
                },
                {
                  // pattern	antd中正则表达式匹配
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify">
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button
                  className="verify-btn"
                  onClick={getVerifyCode}
                  disabled={isShowDownCount}
                >
                  {isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            // 点击登陆事件处理函数
            onClick={onFinish}
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}

export default withRouter(connect(null, { login, mobilelogin })(LoginForm))

//@withRouter
// @connect(null, {
//   login,
// })
// LoginForm;
