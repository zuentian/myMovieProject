import Vue from 'vue'

export function queryRole(params){
    return Vue.http.post('/api/RoleInfoController/queryRole',params||{})
}

export function createRole(params){
    return Vue.http.post('/api/RoleInfoController/createRole',params||{})
}

export function queryRoleByRoleId(params){
    return Vue.http.post("/api/RoleInfoController/queryRoleByRoleId",params||{});
}
export function updateRoleByRoleId(params){
    return Vue.http.post("/api/RoleInfoController/updateRoleByRoleId",params||{});
}

export function deleteRoleByRoleId(params){
    return Vue.http.post("/api/RoleInfoController/deleteRoleByRoleId",params||{});
}

export function updateRoleToStatusByRoleId(params){
    return Vue.http.post("/api/RoleInfoController/updateRoleToStatusByRoleId",params||{});
}
export function queryRoleByStatusAndRoleName(params){
    return Vue.http.post("/api/RoleInfoController/queryRoleByStatusAndRoleName",params||{});
}