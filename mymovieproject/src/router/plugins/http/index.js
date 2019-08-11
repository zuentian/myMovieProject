import VueResource from 'vue-resource'
import HttpInterceptor from './http-interceptor.js'

const plugin = {
  install (Vue, options) {
    Vue.use(VueResource)
    const interceptor = new HttpInterceptor(Vue, options)
    Vue.http.interceptors.push(interceptor)
    Vue.http.options.root = options.HOST || ''
  }
}

export default plugin

export const install = plugin.install
