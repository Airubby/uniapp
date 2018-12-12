import Vue from 'vue'
import App from './App'
import './utils/filters' // 自定义过滤器
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
