import { defineStore } from 'pinia'

const usePermissionStore = defineStore('permissionStore', {
	// arrow function recommended for full type inference
	state: () => ({
		token: "",
		baseURL:""
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
	},
	persist: {
		storage: sessionStorage,
		paths: ["token", "baseURL"],
		beforeRestore: context => {
		  // console.log("Before" + context);
		},
		afterRestore: context => {
		  // console.log("After" + context);
		}
	  }
})

export default usePermissionStore
