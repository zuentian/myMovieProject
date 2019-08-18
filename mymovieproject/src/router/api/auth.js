import Vue from 'vue'


export function getCurrentUser (params) {
    return Vue.http.post('/api/UserService/getCurrentUser', params || {})
  }
  
export function logout(params){
  return Vue.http.post('/api/UserService/logout', params || {})
}

export function register(params){
  return Vue.http.post('/api/UserService/register',params||{})
}

export function login(params){
  return Vue.http.post('/api/UserService/login',params||{})
}