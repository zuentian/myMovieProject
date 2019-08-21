import Vue from 'vue'


export function getCurrentUser (params) {
    return Vue.http.post('/api/LoginController/getCurrentUser', params || {})
  }
  
export function logout(params){
  return Vue.http.post('/api/LoginController/logout', params || {})
}

export function register(params){
  return Vue.http.post('/api/LoginController/register',params||{})
}

export function login(params){
  return Vue.http.post('/api/LoginController/login',params||{})
}