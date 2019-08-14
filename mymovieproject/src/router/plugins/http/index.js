import VueResource from 'vue-resource'
import HttpInterceptor from './http-interceptor.js'

const plugin = {
  install (Vue, options) {
    Vue.use(VueResource)
    const interceptor = new HttpInterceptor(Vue, options)//这个是http拦截器，可以对请求做一些特殊处理
    Vue.http.interceptors.push(interceptor)
    Vue.http.options.root = options.HOST || ''//这个用到服务器上部署应该非常重要
  }
}

export default plugin

export const install = plugin.install
