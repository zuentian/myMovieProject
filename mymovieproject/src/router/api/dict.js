import Vue from 'vue'
export function queryDictByDictType(params){
    return Vue.http.post('/api/DictController/queryDictByDictType',params||{})
}