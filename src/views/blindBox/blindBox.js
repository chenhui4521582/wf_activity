import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import axios from './http'
import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast'
import '@/common/js/window.js'
Vue.use(Toast)
Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.prototype.axios = axios

new Vue({
  router,
  render: r => r(App)
}).$mount('#app')
