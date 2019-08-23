import Vue from 'vue'
export function queryDictByDictType(params){
    return Vue.http.post('/api/DictController/queryDictByDictType',params||{})
}

export function queryDict(params){
    return Vue.http.post('/api/DictController/queryDict',params||{})
}

export function getDictTypeName(params){
    return Vue.http.post('/api/DictController/getDictTypeName',params||{})
}

export function addDict(params){
    return Vue.http.post('/api/DictController/addDict',params||{})
}

export function queryDictByDictId(params){
    return Vue.http.post('/api/DictController/queryDictByDictId',params||{})
}

export function editDictByDictId(params){
    return Vue.http.post('/api/DictController/editDictByDictId',params||{})
}
export function deleteDictByDictId(params){
    return Vue.http.post('/api/DictController/deleteDictByDictId',params||{})
}