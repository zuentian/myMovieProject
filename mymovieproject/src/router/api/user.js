import Vue from 'vue'

export function searchUser(params){
    return Vue.http.post('/api/User/search',params||{})
}

export function createUser(params){
    return Vue.http.post('/api/User/create',params||{})
}