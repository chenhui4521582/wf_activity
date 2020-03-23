/*
*  name: 春节活动-话费券商城
*  auth: chenhui
*/
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast'
import '@/common/js/window'

Vue.config.productionTip = false
Vue.use(Toast)
fastclick.attach(document.body);
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
