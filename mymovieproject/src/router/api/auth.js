import Vue from 'vue'


export function getCurrentUser (params) {
    return Vue.http.post('/api/LoginService/getCurrentUser', params || {})
  }
  
export function logout(params){
  return Vue.http.post('/api/LoginService/logout', params || {})
}

export function register(params){
  return Vue.http.post('/api/LoginService/register',params||{})
}

export function login(params){
  return Vue.http.post('/api/LoginService/login',params||{})
}