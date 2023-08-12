import { defineStore } from 'pinia'

const usePermissionStore = defineStore('permissionStore', {
	// arrow function recommended for full type inference
	state: () => ({
		token: "",
		baseURL:"",
		limits:[]  //权限
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
		}
	},
	persist: {  //只有localStorage
		storage: localStorage,
		paths: ["token", "baseURL","limits"],
		beforeRestore: context => {
		  // console.log("Before" + context);
		},
		afterRestore: context => {
		  // console.log("After" + context);
		}
	  }
})

export default usePermissionStore
