// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from '../../http'
// import axios from 'axios'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css';

// import {Upload} from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
// Vue.use(Upload);

// Vue.use(Mint);

// document.addEventListener('touchmove',function(event){event.preventDefault(); },false);

Vue.config.productionTip = false
fastclick.attach(document.body);
Vue.prototype.axios = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  template: '<App/>',
  components: { App }
})
