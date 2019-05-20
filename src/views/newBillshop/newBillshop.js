import "babel-polyfill";
import Vue from 'vue'
import axios from './http'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast';
import VueClipboard from 'vue-clipboard2'
Vue.use(Toast);
Vue.config.productionTip = false
fastclick.attach(document.body);
Vue.prototype.axios = axios;

// 复制
Vue.use(VueClipboard)
Vue.filter('filter', function (url) {
    if (url && !url.includes('http')) {
        return '//file.beeplay123.com' + url
    } else {
        return url
    }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  template: '<App/>',
  components: { App }
})
