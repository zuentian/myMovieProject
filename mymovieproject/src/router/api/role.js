import Vue from 'vue'
import VueResource from 'vue-resource';

export function queryRole(params){
    return Vue.http.post('/api/RoleInfoController/queryRole',params||{})
}

export function createRole(params){
    return Vue.http.post('/api/RoleInfoController/createRole',params||{})
}

export function queryRoleByRoleId(params){
    return Vue.http.post("/api/RoleInfoController/queryRoleByRoleId",params||{})
}
export function updateRoleByRoleId(params){
    return Vue.http.post("/api/RoleInfoController/updateRoleByRoleId",params);
}