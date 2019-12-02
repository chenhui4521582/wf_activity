import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import axios from './http'
import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast'
import Loading from './components/loading'
import '@/common/js/window.js'
Vue.use(Toast)
Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.prototype.axios = axios
Vue.prototype.$loading = Loading
Vue.filter('imgFilter', url => {
  if (url && url.indexOf('http') < 0) {
    return '//file.beeplaying.com' + url
  } else {
    return url
  }
})

new Vue({
  router,
  render: r => r(App)
}).$mount('#app')
