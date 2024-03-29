export function setToken(token: string) {
	uni.setStorageSync("token",token)
}
export function setBaseURL(baseURL: string) {
	uni.setStorageSync("baseURL",baseURL)
}
export function setLimits(limits:any[]){
	uni.setStorageSync("limits",limits)
}

export function getStorage(key:string){
	uni.getStorageSync(key)
}

export default {
  setToken,
  setBaseURL,
  setLimits,
  getStorage
}
