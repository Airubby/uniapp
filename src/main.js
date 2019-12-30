import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

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


function getServerConfig() {
    return new Promise ((resolve, reject) => {
        uni.request({
            url:"/serverConfig.json",
            success: (res) => {
                console.log(res.data);
                let config = res.data;
                Vue.prototype.$ajaxUrl=config.ajaxUrl;
                store.dispatch("app/setAjaxUrl",config.ajaxUrl)
                resolve();
            }
        })

    })
  }



async function init() {
    App.mpType = 'app'
    await getServerConfig();
    new Vue({
      store,
      render: h => h(App),
    }).$mount()
  }
  init();