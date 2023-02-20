import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/toutiao-icon.css' // 引入项目图标

import 'amfe-flexible' // 引入动态设置rem基准值的包(设置html根节点字体大小)

// 全部引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'

import './styles/index.less'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // ES 2015

dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)

// 定义全局过滤器过滤时间
Vue.filter('relativeTime', (val) => {
  // console.log(val)
  // dayJs() 可以获取到当前时间
  return dayjs().to(val)
})

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
