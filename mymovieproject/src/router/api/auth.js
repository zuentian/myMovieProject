import Vue from 'vue'


export function getCurrentUser (params) {
    return Vue.http.post('/api/Login/getCurrentUser', params || {})
  }
  
export function logout(params){
  return Vue.http.post('/api/Login/logout', params || {})
}

export function register(params){
  return Vue.http.post('/api/Login/register',params||{})
}

export function login(params){
  return Vue.http.post('/api/Login/login',params||{})
}