/**
 * 全局注册自定义过滤器
 * vue.filter
 * 过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示
 * 注释：1.必须放在Vue实例化前面
 * 2. 过滤器函数始终以表达式的值作为第一个参数
 * 3. 可以设置两个过滤器参数,前提是这两个过滤器处理的不冲突
 * 4. 用户从input输入的数据在回传到model之前也可以先处理
 * 5. 可用于双花括号插值{{msg|capitalise}}
 * 6.可用于v-bind 表达式
 */
import Vue from 'vue';
let Name_MAP = { 
  1:"巡检",
  2:"其它"
}
Vue.filter('nameFilter', function(s) {
  if (!s) return ''
  let n = parseInt(s);
  return Name_MAP[n];
})

