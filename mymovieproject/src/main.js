// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，
//这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick。
//FastClick是不会对PC浏览器添加监听事件
import FastClick from 'fastclick'
import {sync} from 'vuex-router-sync'
import { config } from 'components'//这个路径在webpack.base.conf.js里设置了，和@意思一样，其他的就不这么设置

//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css';
//Vue.use(ElementUI);

import '@/assets/styles/index.scss'

Vue.config.productionTip = false


FastClick.attach(document.body);
const { router, store } = config()
sync(store, router)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
