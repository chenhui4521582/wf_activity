/*
*  name: 高光时刻
*  auth: chenhui
*/
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import '@/common/js/window'
Vue.config.productionTip = false
fastclick.attach(document.body);
new Vue({
  render: r => r(App)
}).$mount('#app')
