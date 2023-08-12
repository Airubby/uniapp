import { createSSRApp } from 'vue'
// import * as Pinia from 'pinia'
import pinia from "./store";
// @ts-ignore
import App from './App.vue'

//权限指令
import directive from "./utils/directive";

export function createApp() {
  const app = createSSRApp(App)
  // app.use(Pinia.createPinia())
  app.use(pinia)
  app.use(directive)
  return {
    app,
    // uni-app 官方文档示例 https://zh.uniapp.dcloud.io/tutorial/vue3-pinia.html#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86-pinia
    // pinia // 此处必须将 Pinia 返回
  }
}
