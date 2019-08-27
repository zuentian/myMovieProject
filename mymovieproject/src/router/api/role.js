import Vue from 'vue'

export function queryRole(params){
    return Vue.http.post('/api/RoleInfoController/queryRole',params||{})
}

export function createRole(params){
    return Vue.http.post('/api/RoleInfoController/createRole',params||{})
}

export function queryRoleByRoleId(params){
    return Vue.http.post("/api/RoleInfoController/queryRoleByRoleId",params||{})
}