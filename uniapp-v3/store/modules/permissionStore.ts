import { defineStore } from 'pinia'
import serverConfig from '@/utils/serverConfig';
const usePermissionStore = defineStore('permissionStore', {
	// arrow function recommended for full type inference
	state: () => ({
		forcedLogin:true, //是否需要强制登录，true是
		hasLogin:false, //是否已经登录
		token: "",
		baseURL:serverConfig.baseSite,
		limits:[],  //权限
		userInfo:{},
		sendMsg: "",
		wsData: ""
	}),
	getters: {
		
	},
	actions: {
		setToken(token: string) {
		    this.token = token;
		},
		setBaseURL(baseURL: string) {
		    this.baseURL = baseURL;
		},
		setLimits(limits:any[]){
			this.limits=limits;
		},
		setUserInfo(userInfo:any){
			this.userInfo=userInfo;
		},
		setSendMsg(msg: string) {
			this.sendMsg = msg;
		},
		setWsData(data: any) {
			this.wsData = data;
		}
	},
	persist: {  //只有localStorage
		storage: {
			getItem(key){
				return uni.getStorageSync(key)
			},
			setItem(key,value){
				uni.setStorageSync(key,value)
			}
		},
		// paths: ["token", "baseURL","limits"],
		// beforeRestore: context => {
		//   // console.log("Before" + context);
		// },
		// afterRestore: context => {
		//   // console.log("After" + context);
		// }
	  }
})

export default usePermissionStore
