// 自定义全局组件
import Modal from './ui_compontents/taskAwardPop'
const components = [
  Modal
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
}
// Vue 是全局变量时，自动 install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
