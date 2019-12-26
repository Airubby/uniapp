const getters = {
  loginStatus: state => state.app.loginStatus,
  token: state => state.app.token,
  location:state=>state.app.location,

  forcedLogin:state=>state.app.forcedLogin,
  hasLogin:state=>state.app.hasLogin,
  userName:state=>state.app.userName,

}
export default getters
