import service from '../request'

/**  
 * @param {Object} data {username: string, password: string}
 */
export function login(data) {
  return service.post('/authentication', data,{timeout:200})
}

export function loginQuery(data) {
  return service.postQuery('/authentication', data)
}

export function getCode(){
  return service.get('/api/v1/system/config/queryAppConfig')
}

/**
 * @param {Object} data {userid:"99999999999999999",bu:"home"}
 */
export function getPage(data){
  return service.get('/api/v1/system/visual/page',data,{timeout:20})
}

export default {
  login,
  loginQuery,
  getCode,
  getPage
}
