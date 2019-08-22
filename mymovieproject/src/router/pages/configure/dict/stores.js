import {queryDict,getDictTypeName} from '@/router/api'

const actions={
    QueryDict({dispatch,commit,state},params){
        return queryDict(params);
    },
    GetDictTypeName({dispatch,commit,state},params){
        return getDictTypeName(params);
    },

}

export const stores={
    actions
}