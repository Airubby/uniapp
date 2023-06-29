import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia:any = createPinia()
pinia.use(createPersistedState({
  serializer: { // 指定参数序列化器
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  }
}))

export default pinia



export { default as useCountStore } from './modules/countStore'
export { default as usePermissionStore } from './modules/permissionStore'
