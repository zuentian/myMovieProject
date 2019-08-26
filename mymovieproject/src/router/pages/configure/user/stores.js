
import {searchUser,queryDictByDictType,createUser,queryUserByUserId,updateUserByUserId,deleteUserByUserId,updateUserToStatusByUserId} from '@/router/api'

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
    },
    DeleteUserByUserId({dispatch,commit,state},params){
        return deleteUserByUserId(params);
    },
    UpdateUserToStatusByUserId({dispatch,commit,state},params){
        return updateUserToStatusByUserId(params);
    }
}

export const stores={
    actions
}