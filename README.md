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

sdk_manage
├─.DS_Store
├─.editorconfig
├─.env
├─.gitignore
├─.npmrc
├─.prettierignore
├─.prettierrc
├─.umirc.ts
├─README.md
├─package.json
├─tsconfig.json
├─typings.d.ts
├─src
|  ├─.DS_Store
|  ├─global.css
|  ├─global.less
|  ├─type.d.ts
|  ├─utils
|  |   └modelUtils.ts
|  ├─pages
|  |   ├─index.css
|  |   ├─index.less
|  |   ├─index.tsx
|  |   ├─whitelist
|  |   |     ├─index.less
|  |   |     ├─index.tsx
|  |   |     ├─services
|  |   |     |    └whitelist.ts
|  |   |     ├─models
|  |   |     |   └whitelist.ts
|  |   |     ├─components
|  |   |     |     ├─Detail.less
|  |   |     |     ├─Detail.tsx
|  |   |     |     ├─Edit.less
|  |   |     |     ├─Edit.tsx
|  |   |     |     ├─Header.less
|  |   |     |     ├─Header.tsx
|  |   |     |     ├─TableList.tsx
|  |   |     |     ├─TotalNum.less
|  |   |     |     └TotalNum.tsx
├─mock
|  ├─.gitkeep
|  └whitelist.ts
├─.git
|  ├─HEAD
|  ├─config
|  ├─description
|  ├─index
|  ├─packed-refs
|  ├─refs
|  |  ├─tags
|  |  ├─remotes
|  |  |    ├─origin
|  |  |    |   └HEAD
|  |  ├─heads
|  |  |   └master
|  ├─objects
|  |    ├─pack
|  |    |  ├─pack-0e38d4573f59c57496199e443d7e3f23725db117.idx
|  |    |  └pack-0e38d4573f59c57496199e443d7e3f23725db117.pack
|  |    ├─info
|  ├─logs
|  |  ├─HEAD
|  |  ├─refs
|  |  |  ├─remotes
|  |  |  |    ├─origin
|  |  |  |    |   └HEAD
|  |  |  ├─heads
|  |  |  |   └master
|  ├─info
|  |  └exclude
|  ├─hooks
|  |   ├─applypatch-msg.sample
|  |   ├─commit-msg.sample
|  |   ├─fsmonitor-watchman.sample
|  |   ├─post-update.sample
|  |   ├─pre-applypatch.sample
|  |   ├─pre-commit.sample
|  |   ├─pre-merge-commit.sample
|  |   ├─pre-push.sample
|  |   ├─pre-rebase.sample
|  |   ├─pre-receive.sample
|  |   ├─prepare-commit-msg.sample
|  |   └update.sample
```

---

### 第一期开发

| 前端 | 后端 |                             接口文档                             |
| :--: | :--: | :--------------------------------------------------------------: |
| 曹家铭 | 李超 |http://staging.manager.sec.miui.com/phoneManager/swagger-ui.html#/SDK%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0 |
