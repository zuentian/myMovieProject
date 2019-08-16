
import {searchUser,createUser} from '@/router/api'

const actions={
    AC_SearchUser({dispatch,commit,state},params){
        return searchUser(params);
    },
    AC_CreateUser({dispatch,commit,state},params){
        return createUser(params);
    }
}

export const stores={
    actions
}