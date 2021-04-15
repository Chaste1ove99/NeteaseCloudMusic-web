# 独立版 - 小米隐私合规检测平台

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve(mock数据)
yarn run serve:staging(staging数据)

```

### Compiles and minifies for production

```
yarn run build
```

## 基本信息

项目是使用 Vue CLI v3 创建的标准单页应用，有一些约定需要特别注意。

### [设计模式](https://wsq.cool/post/maral8)

在 hooks 思想的冲击下，这套设计模式已经过时了，为了迎接马上要到来的 Vue3，建议新页面使用[vue-composition-api](https://github.com/vuejs/composition-api)编写，更合适的设计模式还在摸索中。

### 持续部署

Dev branch push event 会触发 staging 环境的部署， Master branch push event 会触发生产环境的部署。

#### Staging

Host: http://staging.p.sec.miui.com

FDS Region: 武清测试

FDS Bucket: privacy-detection-staging

#### Priview

Host: https://priview.p.sec.miui.com

FDS Region: C3

FDS Bucket: privacy-detection-priview

#### Production

Host: https://p.sec.miui.com

FDS Region: C3

FDS Bucket: privacy-detection

### 代码风格

在提交时会对代码风格进行一次检查，在编辑器中安装 eslint 插件有助于在开发时发现问题。

### 自动路由与布局

使用了[vue-cli-plugin-auto-routing](https://github.com/ktsn/vue-cli-plugin-auto-routing)，请仔细阅读文档。

### Tips

1. 全局样式：`@/assets/style.scss`，全局 scss 变量: `@/assets/var.scss`；
2. mock 地址：http://mock.be.mi.com/project/946/interface/api。
