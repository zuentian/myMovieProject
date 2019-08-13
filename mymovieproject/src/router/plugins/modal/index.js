import {
  Message,
  MessageBox,
  Notification,
  Loading
} from 'element-ui'
//公共弹窗
var modal = {
  toast: Message,
  alert: MessageBox.alert,
  prompt: MessageBox.prompt,
  confirm: MessageBox.confirm,
  notify: Notification,
  loading: Loading.service
}

window.modal = modal

const plugin = {
  install(Vue) {
    Vue.prototype.$modal = modal
    Vue.modal = modal
  }
}

export default plugin
export const install = plugin.install
