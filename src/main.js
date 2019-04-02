// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import VueTouch from 'vue-touch'

Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false


global.API_PROXY = 'https://bird.ioliu.cn/v2/?url='

global.domain = 'http://127.0.0.1:4000'
// global.domain = 'http://139.199.132.22:4000'
// global.domain = 'http://139.199.132.22'
// global.domain = 'http://139.199.132.22:3000'


import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
Vue.use(IScrollView, IScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
