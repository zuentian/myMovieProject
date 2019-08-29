import {queryRole,createRole,queryRoleByRoleId,updateRoleByRoleId,deleteRoleByRoleId,updateRoleToStatusByRoleId,queryRoleByRoleNameConfuse} from '@/router/api'
const actions={
    QueryRole({dispatch,commit,state},params){
        return queryRole(params);
    },
    CreatRole({dispatch,commit,state},params){
        return createRole(params);
    },
    QueryRoleByRoleId({dispatch,commit,state},params){
        return queryRoleByRoleId(params);
    },
    UpdateRoleByRoleId({dispatch,commit,state},params){
        return updateRoleByRoleId(params);
    },
    DeleteRoleByRoleId({dispatch,commit,state},params){
        return deleteRoleByRoleId(params);
    },
    UpdateRoleToStatusByRoleId({dispatch,commit,state},params){
        return updateRoleToStatusByRoleId(params);
    },
    QueryRoleByRoleNameConfuse({dispatch,commit,state},params){
        return queryRoleByRoleNameConfuse(params);
    }
}

export const stores={
    actions
}