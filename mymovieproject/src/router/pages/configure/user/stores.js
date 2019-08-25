
import {searchUser,queryDictByDictType,createUser,queryUserByUserId,updateUserByUserId} from '@/router/api'

const actions={
    AC_SearchUser({dispatch,commit,state},params){
        return searchUser(params);
    },
    QueryDictByDictType({dispatch,commit,state},params){
        return queryDictByDictType(params);
    },
    CreateUser({dispatch,commit,state},params){
        return createUser(params);
    },
    QueryUserByUserId({dispatch,commit,state},params){
        return queryUserByUserId(params);
    },
    UpdateUserByUserId({dispatch,commit,state},params){
        return updateUserByUserId(params);
    }
}

export const stores={
    actions
}