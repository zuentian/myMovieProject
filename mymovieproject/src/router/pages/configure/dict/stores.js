import {queryDict,getDictTypeName,addDict,queryDictByDictId,editDictByDictId,deleteDictByDictId} from '@/router/api'

const actions={
    QueryDict({dispatch,commit,state},params){
        return queryDict(params);
    },
    GetDictTypeName({dispatch,commit,state},params){
        return getDictTypeName(params);
    },
    AddDict({dispatch,commit,state},params){
        return addDict(params);
    },
    QueryDictByDictId({dispatch,commit,state},params){
        return queryDictByDictId(params);
    },
    EditDictByDictId({dispatch,commit,state},params){
        return editDictByDictId(params);
    },
    DeleteDictByDictId({dispatch,commit,state},params){
        return deleteDictByDictId(params);
    }
}

export const stores={
    actions
}