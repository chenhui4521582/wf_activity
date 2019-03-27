/*
*  name: 充值送福气活动
*  auth: chenhui
*/

import "babel-polyfill";
import Vue from 'vue'
import axios from './http'
import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast';
Vue.use(Toast);
Vue.config.productionTip = false
fastclick.attach(document.body);

Vue.prototype.axios = axios;
import VueClipboard from 'vue-clipboard2'
// 复制
Vue.use(VueClipboard)


Vue.filter('filter', function (url) {
    if (url && !url.includes('http')) {
        return '//file.beeplay123.com' + url
    } else {
        return url
    }
});

new Vue({
    render: r => r(App)
}).$mount('#app')
