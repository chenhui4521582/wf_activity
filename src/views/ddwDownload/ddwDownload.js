
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import axios from '../../http'
import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast';
import '../../common/js/window'

Vue.use(Toast);
Vue.config.productionTip = false
fastclick.attach(document.body);
Vue.prototype.axios = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
//   router,
  template: '<App/>',
  components: { App }
})
