import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";

// 引入国际化语言包
import { IntlProvider } from 'react-intl'
// 引入语言包 
import { zh, en } from './locales'
// 引入pubsub
import PubSub from 'pubsub-js'

// 1. 在App.js组件中引入 ConfigProvider 组件
import { ConfigProvider } from 'antd'
// 2. 引入antd中提供的语言包
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App () {
  const [locale, setLocale] = useState('zh')
  // 订阅
  useEffect(() => {
    const token = PubSub.subscribe('LANGUAGE', (message, data) => {
      // console.log(data)
      setLocale(data)
      return () => {
        // 取消订阅
        PubSub.unsubscribe(token)
      }
    })
  }, [])
  // 通过window.navigator获取当前浏览器的语言环境
  // const locale = window.navigator.language === 'zh-CN' ? 'zh' : 'en'
  // const locale = 'en'
  // 根据当前语言环境决定返回的是什么包
  const message = locale === 'en' ? en : zh
  const antdLocale = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      {/* 
      locale-->当前是什么语言环境 就是说当前使用的是什么语言
      messages-->选中哪个语言包
      */}
      <ConfigProvider locale={antdLocale}>
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
