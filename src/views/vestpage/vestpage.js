// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import axios from '../../http'
import App from './App'
// import router from './router'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast'
import '@/common/js/window.js'
import VueClipboard from 'vue-clipboard2'
// document.addEventListener('touchmove',function(event){event.preventDefault(); },false);
Vue.use(Toast)
// 复制
Vue.use(VueClipboard)
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.prototype.axios = axios

Vue.filter('filter', function (url) {
  if (url && !url.includes('http')) {
    return '//file.beeplaying.com' + url
  } else {
    return url
  }
})
localStorage.setItem('APP_CHANNEL','100039')
localStorage.setItem('ACCESS_TOKEN','3e27f626972349a3a0d783a7fa4c908b')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  //   router,
  template: '<App/>',
  components: { App }
})
