const app = {
  namespaced: true,
  state: {
    loginStatus:false,
    token:'',
    location:"定位中...",
    ajaxUrl:"",

    /**
     * 是否需要强制登录
     */
    forcedLogin: false,
    hasLogin: false,
    userName: "",
    
  },
  getters : {
    loginStatus: state => state.loginStatus,
    token: state => state.token,
    location:state=>state.location,
    ajaxUrl:state=>state.ajaxUrl,
  
    forcedLogin:state=>state.forcedLogin,
    hasLogin:state=>state.hasLogin,
    userName:state=>state.userName,
  
  },
  mutations: {
    SET_STATUS: (state, loginState) => {
      state.loginStatus = loginState
    },
    SET_LOCATION: (state, location) => {
      state.location = location
    },
    SET_AJAXURL:(state, url) => {
      state.ajaxUrl = url
    },


    login(state, userName) {
        state.userName = userName || '新用户';
        state.hasLogin = true;
    },
    logout(state) {
        state.userName = "";
        state.hasLogin = false;
    }
  },
  actions: {
    setStatus({commit},loginState){
      commit('SET_STATUS', loginState)
    },
    setLocation({commit},location){
      commit('SET_LOCATION', location)
    },
    setAjaxUrl({commit},url){
      commit('SET_AJAXURL', url)
    }

  }

}

export default app
