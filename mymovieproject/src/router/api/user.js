import Vue from 'vue'

export function searchUser(params){
    return Vue.http.post('/api/UserInfoController/search',params||{})
}

export function createUser(params){
    return Vue.http.post('/api/UserInfoController/create',params||{})
}
export function queryUserByUserId(params){
    return Vue.http.post("/api/UserInfoController/queryUserByUserId",params||{})
}
export function updateUserByUserId(params){
    return Vue.http.post("/api/UserInfoController/updateUserByUserId",params||{})
}