import Vue from 'vue'


export function getCurrentUser (params) {
    return Vue.http.post('/LoginService/getCurrentUser', params || {})
  }
  
export function logout(params){
  return Vue.http.post('/LoginService/getCurrentUser', params || {})
}