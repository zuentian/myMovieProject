
import {searchUser,queryDictByDictType,createUser} from '@/router/api'

const actions={
    AC_SearchUser({dispatch,commit,state},params){
        return searchUser(params);
    },
    QueryDictByDictType({dispatch,commit,state},params){
        return queryDictByDictType(params);
    },
    CreateUser({dispatch,commit,state},params){
        return createUser(params);
    }
}

export const stores={
    actions
}