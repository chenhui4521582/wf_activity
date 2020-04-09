/*
*  name: 话费卷商城
*  auth: chenhui
*/
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/router'
import Components from './components/index'
import fastclick from 'fastclick'
import '@/common/js/window'
import VueClipboard from 'vue-clipboard2'
fastclick.attach(document.body)
Vue.config.productionTip = false
/** 全局公共组件 **/
Vue.use(Components)
// 复制
Vue.use(VueClipboard)

new Vue({
  router,
  render: r => r(App)
}).$mount('#app')
