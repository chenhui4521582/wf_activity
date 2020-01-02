// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import axios from '../../http'
import App from './App'
import Toast from '../../plugins/toast';
import router from './router'

Vue.use(Toast);
Vue.config.productionTip = false
Vue.prototype.axios = axios;

Vue.filter('filter', function(url){
    if(url && !url.includes('http')){
        return '//file.beeplaying.com'+ url
    }else {
        return url
    }
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  axios,
//   router,
  template: '<App/>',
  components: { App }
})
