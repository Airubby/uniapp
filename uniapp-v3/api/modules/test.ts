import service from '../request'

/**  getCode(phone: string): Promise<{ num: number }> {}
 * @param {Object} data {username: string, password: string}
 */
export function login(data) {
  return service.post('/authentication', data)
}

export function loginQuery(data) {
  return service.postQuery('/authentication', data)
}

function getCode(){
  return service.get('/api/v1/system/config/queryAppConfig')
}

function getPage(params){
  return service.get('/api/v1/system/visual/page',params,{timeout:20})
}

export default {
  login,
  loginQuery,
  getCode,
  getPage
}
