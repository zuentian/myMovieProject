
import { SvgIcon } from '../../../components/svg-icon/index'
import generateIconsView from '../../../components/views/svg-icons/generateIconsView.js'

const plugin = {
  install(Vue, options) {
    Vue.component('svg-icon', SvgIcon)
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    const req = require.context('@/assets/icons', false, /\.svg$/)//要用这个'/\.svg$/'需要在webpack.base.conf.js里配置
    const iconMap = requireAll(req)
    generateIconsView.generate(iconMap)
  }
}

export default plugin
export const install = plugin.install
