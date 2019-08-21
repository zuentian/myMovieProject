import { isFunction } from './util.js'

const handleError = function(err) {
  throw err
}

const extractData = function(res){
  return new Promise((resolve, reject)=>{
    //console.log("http拦截器之前的返回",res);
    let {
      status,
      data,
      bodyText,
    } = res
    if(data==null){//此处防止后端没有返回东西导致报错,如果data为空，就取bodyText里的内容
      resolve(bodyText)
    }else{
      let {
        status,
        data: {
          code,
          msg
        }
      } = res
      if(status !== 200) {
        reject(res)
      } else{
        //console.log("http拦截器之后的返回",data);
        resolve(data)
        
      }
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
