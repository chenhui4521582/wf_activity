// The Vue build version to load with the `import` command
import 'babel-polyfill'
import Vue from 'vue'
import axios from '../../http'
import App from './App'
import Toast from '../../plugins/toast'
Vue.use(Toast)
Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.filter('filter', function (url) {
  if (url && !url.includes('http')) {
    return '//file.beeplaying.com' + url
  } else {
    return url
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  template: '<App/>',
  components: { App }
})
