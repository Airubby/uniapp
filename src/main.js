import Vue from 'vue'
import App from './App'
import store from './store'
import request from './service/request'


Vue.config.productionTip = false
Vue.prototype.$api = request
import util from './common/util'  //工具函数
//绑定工具函数到全局
Vue.prototype.$util = util
import echarts from './common/echarts.min.js'  //工具函数
Vue.prototype.$echarts =echarts

Vue.prototype.$store = store


// import aiForm from '@/components/ai-form-group/ai-form/index.vue'
// import aiInput from '@/components/ai-form-group/ai-input/index.vue'
// Vue.component("ai-form", aiForm)
// Vue.component("ai-input", aiInput)


App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
