# 三方SDK管理

### 项目简介

【技术概述】：项目以react<17.0.0>为基础构建的三方SDK管理项目，使用npm为包管理器，引入antd<4.8.6>和Antd Mi作为样式框架。

【功能概述】：项目作为三方SDK管理后台，直观展现了SDK的包名、操作人、修改时间等主要属性，实现了增加、删除、搜索、编辑等功能。

【参考文档】：

Antd：https://ant.design/index-cn

产品设计图：https://www.figma.com/file/Mt5xh6LATVtqQPJqcAnqrj/权限管理平台（新版）?node-id=3225%3A267

---

### 项目构建

```
npm install

npm start

目录结构说明

├─src
|  ├─.DS_Store
|  ├─global.css
|  ├─global.less
|  ├─type.d.ts (变量接口文件）
|  ├─utils
|  |   └modelUtils.ts
|  ├─pages
|  |   ├─index.css
|  |   ├─index.less
|  |   ├─index.tsx 
|  |   ├─sdkmanage
|  |   |     ├─index.less
|  |   |     ├─index.tsx（项目入口文件）
|  |   |     ├─services
|  |   |     |    └sdkmanage.ts （api接口文件）
|  |   |     ├─models
|  |   |     |   └sdkmanage.ts （项目模板组件）
|  |   |     ├─components
|  |   |     |     ├─Delete.css 
|  |   |     |     ├─Delete.less
|  |   |     |     ├─Delete.tsx （删除弹窗组件）
|  |   |     |     ├─Detail.less
|  |   |     |     ├─Detail.tsx （详情弹窗组件）
|  |   |     |     ├─Edit.css
|  |   |     |     ├─Edit.less
|  |   |     |     ├─Edit.tsx （编辑/新增功能弹窗组件）
|  |   |     |     ├─Header.less
|  |   |     |     ├─Header.tsx （项目顶部栏组件）
|  |   |     |     ├─TableList.tsx （项目列表组件）
|  |   |     |     ├─TotalNum.less
|  |   |     |     └TotalNum.tsx （项目顶部数量组件）
```

---

### 第一期开发

| 前端 | 后端 |                             接口文档                             |
| :--: | :--: | :--------------------------------------------------------------: |
| 曹家铭 | 李超 |http://staging.manager.sec.miui.com/phoneManager/swagger-ui.html#/SDK%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0 |
