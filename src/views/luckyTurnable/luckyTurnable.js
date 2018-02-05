// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import axios from '../../http'
import App from './App'
// import router from './router'
import Toast from '../../plugins/toast';
// import 'element-ui/lib/theme-default/index.css';

// Vue.use(Mint);

// document.addEventListener('touchmove',function(event){event.preventDefault(); },false);
Vue.use(Toast);
Vue.config.productionTip = false
Vue.prototype.axios = axios;

Vue.filter('filter', function(url){
    if(url && !url.includes('http')){
        return '//file.beeplay123.com'+ url
    }else {
        return url
    }
});
// Vue.http.headers.common['Authorization'] = '80b6055b254b40ef96598c7619fcc036';
// Vue.http.headers.common['App-Channel'] = '100002';
// Vue.http.headers.common['App-Version'] = '1.0.0';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
//   router,
  template: '<App/>',
  components: { App }
})
