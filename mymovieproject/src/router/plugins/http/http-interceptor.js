import { isFunction } from './util.js'

const handleError = function(err) {
  throw err
}

const extractData = function(res){
  return new Promise((resolve, reject)=>{
    console.log("res1111",res);
    let {
      status,
      data: {
        code,
        data,
        msg
      }
    } = res
    console.log("res",res,status,data,code);
    if(status !== 200) {
      reject(res)
    } else if(code!== 200){
      reject(res.data)
    }else{
      resolve(data)
    }
  })
}

export default class HttpInterceptor {
  constructor(Vue, options) {
    if(options && options.handler && options.handler.extractData && !isFunction(options.handler.extractData)){
      console.warn('extractData must be function!', options.handler)
    }
    if(options && options.handler && options.handler.handleError && !isFunction(options.handler.handleError)) {
      console.warn('handleError must be function!', options.handler)
    }

    let { handler={handleError,extractData} } = options || {}

    Array.prototype.forEach.call(['get', 'delete', 'head', 'jsonp'], function(method){
      let _method = Vue.http[method]
      Vue.http[method] = function (url, options) {
        return _method.call(this, url, options).then(res => {
          return isFunction(handler.extractData)?handler.extractData(res):extractData(res)
        }).catch(err => {
          return isFunction(handler.handleError)?handler.handleError(err):handleError(err)
        })
      }
    })

    Array.prototype.forEach.call(['post', 'put', 'patch'], function(method){
      let _method = Vue.http[method]
      Vue.http[method] = function (url, body, options) {
        return _method.call(this, url, body, options).then(res => {
          return isFunction(handler.extractData)?handler.extractData(res):extractData(res)
        }).catch(err => {
          return isFunction(handler.handleError)?handler.handleError(err):handleError(err)
        })
      }
    })

    return (request, next) => {
      next()
    }
  }
}
