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
import '@/common/js/window.js'
Vue.use(Toast);
Vue.config.productionTip = false
fastclick.attach(document.body);

Vue.prototype.axios = axios;
import VueClipboard from 'vue-clipboard2'
// 复制
Vue.use(VueClipboard)


Vue.filter('filter', function (url) {
    if (url && !url.includes('http')) {
        return '//file.beeplaying.com' + url
    } else {
        return url
    }
});

Vue.filter('timeFormat', function (data, type) {
    if(!data){
        return ''
    }
    let date = new Date(data),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
    m = m < 10 ? `0${m}` : m
    d = d < 10 ? `0${d}` : d
    h = h < 10 ? `0${h}` : h
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second

    if(type == 'y-m-d') {
        return `${y}-${m}-${d}`
    }
    return `${y}-${m}-${d} ${h}:${minute}:${second}`
});

new Vue({
    render: r => r(App)
}).$mount('#app')
