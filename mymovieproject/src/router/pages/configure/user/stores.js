
import {searchUser,createUser,queryDictByDictType} from '@/router/api'

const actions={
    AC_SearchUser({dispatch,commit,state},params){
        return searchUser(params);
    },
    AC_CreateUser({dispatch,commit,state},params){
        return createUser(params);
    },
    QueryDictByDictType({dispatch,commit,state},params){
        return queryDictByDictType(params);
    }
}

export const stores={
    actions
}