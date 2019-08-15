
import {searchUser} from '@/router/api'

const actions={
    AC_SearchUser({dispatch,commit,state},params){
        return searchUser(params);
    }
}

export const stores={
    actions
}