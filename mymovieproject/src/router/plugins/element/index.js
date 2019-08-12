import Element from 'element-ui'
const plugin = {
  install(Vue, options) {
    Vue.use(Element, {
      size: 'medium'
    })
  }
}

export default plugin
export const install = plugin.install
