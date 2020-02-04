import Header from './header'
import Modal from './modal'
import Button from './button'
import Filters from './Filters'
import Toast from '../../../plugins/toast';
import VueClipboard from 'vue-clipboard2'
// 自定义全局组件
const components = [
  Header,
  Modal,
  Button,
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
  Filters.map(filter => {
    Vue.filter(filter.name, filter.method)
  })
  Vue.use(Toast)
  Vue.use(VueClipboard)
}

// Vue 是全局变量时，自动 install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
