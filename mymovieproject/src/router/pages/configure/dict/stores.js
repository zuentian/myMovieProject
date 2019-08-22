import {queryDict,getDictTypeName,addDict} from '@/router/api'

const actions={
    QueryDict({dispatch,commit,state},params){
        return queryDict(params);
    },
    GetDictTypeName({dispatch,commit,state},params){
        return getDictTypeName(params);
    },
    AddDict({dispatch,commit,state},params){
        return addDict(params);
    }
}

export const stores={
    actions
}