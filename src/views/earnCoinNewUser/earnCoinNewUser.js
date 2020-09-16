/*
*  name: 新人福利
*  auth: chenhui
*/
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import Components from './components/index'
import '@/common/js/window'
Vue.config.productionTip = false
fastclick.attach(document.body);
/** 全局公共组件 **/
Vue.use(Components);
new Vue({
  render: r => r(App)
}).$mount('#app')
