/*
*  name: 高光时刻
*  auth: chenhui
*/
import "babel-polyfill";
import Vue from 'vue'
import router from './router/router'
import fastclick from 'fastclick'
import Components from './components/index'
import App from './App'
import '@/common/js/window'
Vue.config.productionTip = false
fastclick.attach(document.body);
/** 全局公共组件 **/
Vue.use(Components);
new Vue({
  router,
  render: r => r(App)
}).$mount('#app')
