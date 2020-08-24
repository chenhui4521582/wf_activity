/*
*  name: 裂变活动
*  auth: chenhui
*/
import "babel-polyfill";
import Vue from 'vue'
import router from './router/index'
import App from './App'
import fastclick from 'fastclick'
import Components from './components/index'
import '@/common/js/window'
import VueClipboard from 'vue-clipboard2'
Vue.config.productionTip = false
fastclick.attach(document.body);
/** 全局公共组件 **/
Vue.use(Components);
Vue.use(VueClipboard)
new Vue({
  router,
  render: r => r(App)
}).$mount('#app')
