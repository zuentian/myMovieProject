import VueResource from 'vue-resource'
import HttpInterceptor from './http-interceptor.js'

const plugin = {
  install (Vue, options) {
    Vue.use(VueResource)
    const interceptor = new HttpInterceptor(Vue, options)
    Vue.http.interceptors.push(interceptor)
    Vue.http.options.root = options.HOST || ''//这个用到服务器上部署应该非常重要
  }
}

export default plugin

export const install = plugin.install
