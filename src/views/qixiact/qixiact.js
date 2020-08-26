/*
*  name: 高光时刻
*  auth: chenhui
*/
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import '@/common/js/window'
import Toast from '../../plugins/toast'
import moduleConfig from './moduleConfig'

Vue.prototype.$moduleConfig = moduleConfig
Vue.use(Toast)
Vue.config.productionTip = false
fastclick.attach(document.body);
Vue.filter('filterPrice', function (value) {
  if (value) {
    return value > 10000 ? value / 10000 + '万' : value
  }
})
new Vue({
  render: r => r(App)
}).$mount('#app')
