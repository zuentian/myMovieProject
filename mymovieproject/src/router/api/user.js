import Vue from 'vue'

export function searchUser(params){
    return Vue.http.post('/api/UserApiService/search',params||{})
}