// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import axios from './http'
import App from './App'
// import router from './router'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast';
import VueClipboard from 'vue-clipboard2'

// document.addEventListener('touchmove',function(event){event.preventDefault(); },false);
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
Vue.directive('anchor',{
    inserted : function(el,binding){
        el.onclick = function(){
            document.body.scrollTop =document.getElementById(binding.value).offsetTop-parseFloat(document.querySelector('html').style.fontSize||0)*0.76
            !document.body.scrollTop&&(document.documentElement.scrollTop =document.getElementById(binding.value).offsetTop-parseFloat(document.querySelector('html').style.fontSize||0)*0.76)
        }}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
//   router,
  template: '<App/>',
  components: { App }
})
