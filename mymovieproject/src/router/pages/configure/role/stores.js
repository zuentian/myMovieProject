import {queryRole,createRole,queryRoleByRoleId,updateRoleByRoleId} from '@/router/api'
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
    }
}

export const stores={
    actions
}