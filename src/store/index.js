// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// const store = new Vuex.Store({
//     state: {
//         /**
//          * 是否需要强制登录
//          */
//         forcedLogin: false,
//         hasLogin: false,
//         userName: ""
//     },
//     mutations: {
//         login(state, userName) {
//             state.userName = userName || '新用户';
//             state.hasLogin = true;
//         },
//         logout(state) {
//             state.userName = "";
//             state.hasLogin = false;
//         }
//     },
//     actions:{
        
//     }
// })

// export default store



//import { mapGetters } from 'vuex'
// computed:{
//     ...mapGetters([
//         'forcedLogin','hasLogin'
//     ]),
// },

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        app
    },
})

export default store

