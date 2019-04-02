# vueapp1
网站前端使用 Vue.js， 后端使用 Node.js 配合 Express 框架完成了一个单页的 Web 程序（SPA），站内所有的页面跳转都不需要刷新。充分利用 Vue 进行组件化开发，增加对于组件的复用，使用 Axios 对后台数据进行异步获取，使用 MongoDB 对数据进行操作处理， 采用 Bootstrap 对网站进行响应式布局。同时使用 JQuery 实现了一些与用户交互的特效。其中相册功能采用了Node 中的 cheerio 模块配合 sync-request 库可以实现一键爬虫功能，按需爬取自己所需要的相册。线上地址:http://139.199.132.22/
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
