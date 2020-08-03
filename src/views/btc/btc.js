import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast'
import '@/common/js/window.js'
import VueClipboard from 'vue-clipboard2'
Vue.use(Toast)
Vue.use(VueClipboard)
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.filter('filter', function (url) {
  if (url && !url.includes('http')) {
    return '//file.beeplaying.com' + url
  } else {
    return url
  }
})
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
