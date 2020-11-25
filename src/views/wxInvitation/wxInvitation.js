import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import '@/common/js/window'
import VueClipboard from 'vue-clipboard2'
import Toast from '../../plugins/toast'
Vue.use(Toast)
Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.filter('filter', function (url) {
  if (url && !url.includes('http')) {
    return '//file.beeplaying.com' + url
  } else {
    return url
  }
})
new Vue({
  render: r => r(App)
}).$mount('#app')
