// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// import router from './router'
import axios from './http'
import fastclick from 'fastclick'
import Toast from '@/plugins/toast'
import '@/common/js/window.js'
import VueClipboard from 'vue-clipboard2'
// document.addEventListener('touchmove',function(event){event.preventDefault(); },false);
Vue.use(Toast)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.axios = axios
fastclick.attach(document.body)
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
  //   router,
  template: '<App/>',
  components: { App }
})
