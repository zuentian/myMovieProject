import mixin from './mixin'
const plugin = {
  install(Vue, options) {
    Vue.mixin(mixin)
  }
}

export default plugin
export const install = plugin.install
