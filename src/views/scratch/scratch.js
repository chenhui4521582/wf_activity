/*
*  name: 玩家攻略发布
*  auth: chenhui
*/
import "babel-polyfill";
import Vue from 'vue'
import Main from './main'
import router from './router/router'
import fastclick from 'fastclick'
import Components from './components/index'
import '@/common/js/window'
Vue.config.productionTip = false
fastclick.attach(document.body);
/** 全局公共组件 **/
Vue.use(Components);
new Vue({
  router,
  render: r => r(Main)
}).$mount('#app')
