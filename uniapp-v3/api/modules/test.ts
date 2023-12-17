import service from '../request'

export function test(data){
	return service({
		  url:'/api/v1/system/visual/page',
		  data,
		  timeout:2000,
		  method:'POST',
		  header:{
		  		// loadingMsg:"登录中..."
		  }
	})
}

/**  
 * @param {Object} data {username: string, password: string}
 */
export function login(data) {
  return service({
	  url:'/authentication',
	  data,
	  timeout:2000,
	  method:'POST',
	  header:{
	  		// loadingMsg:"登录中..."
	  }
  })
}

export function getCode(){
  return service({
	  url:'/api/v1/system/config/queryAppConfig',
	  method:'GET',
	  header:{
	  		noLoading:true
	  }
  })
}
 /**
  * @param {Object} data {userid:"99999999999999999",bu:"home"}
  */
export function getPage(data){
  return service({
	  url:'/api/v1/system/visual/page',
	  data,
	  method:'GET'
  })
}
export default {
  login,
  getCode,
  getPage,
  test
}
