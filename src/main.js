import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

import util from './common/util'  //工具函数
//绑定工具函数到全局
Vue.prototype.$util = util
import echarts from './common/echarts.min.js'  //工具函数
Vue.prototype.$echarts =echarts

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
