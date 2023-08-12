import {usePermissionStore} from "@/store"

export default {
  install: (app: any) => {
    // v-permission: 功能权限指令 v-permission="['add','edit']"
    const permissionStore = usePermissionStore();
    app.directive('permission', (el: any, binding: any, vNode: any, prevNode: any) => {
      // 注意 prevNode 只有在 updated 生命周期才有值！
      // console.log(el, binding, vNode, prevNode);
      const { value } = binding;
      const limits = permissionStore.limits
      //有些按钮支持多个功能权限,比如新增编辑都是同一个按钮触发
      if (value && value instanceof Array && value.length > 0) {
        const hasPermission = limits.some(limit => {
          return value.includes(limit);
        });
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      } else {
        throw new Error(`need limits! Like v-permission="['add','edit']"`);
      }
    })
  }
};