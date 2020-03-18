

import "babel-polyfill";
import Vue from 'vue'

import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast';
import '@/common/js/window.js'

import Router from 'vue-router'
Vue.use(Router)
Vue.use(Toast);
Vue.config.productionTip = false
fastclick.attach(document.body);

// export default new Router({
//   routes: [
//     {
//       // path: '/',
//       // name: 'index',
//       // component: index
//     },
 
//   ]
// })

// 复制
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.filter('filter', function (url) {
  if (url && !url.includes('http')) {
    return '//file.beeplaying.com' + url
  } else {
    return url
  }
});
Vue.filter('NumFormat', function(value) {
  if(!value) return '0.00';
  var intPart = Number(value).toFixed(0); //获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
  // var floatPart = ".00"; //预定义小数部分
  // var value2Array = value.split(".");
  //=2表示数据有小数位
  // if(value2Array.length == 2) {
  //   floatPart = value2Array[1].toString(); //拿到小数部分
  //   if(floatPart.length == 1) { //补0,实际上用不着
  //     return intPartFormat + "." + floatPart + '0';
  //   } else {
  //     return intPartFormat + "." + floatPart;
  //   }
  // } else {
    return intPartFormat 
    // + floatPart;
  // }
});
Vue.filter('filterPrice', function (value) {
  if (value) {
    return value > 10000 ? value / 10000 + '万' : value
  }
})
Vue.filter('timeFormat', function (data, type) {
  if (!data) {
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
  if (type == 'm-d') {
    return `${m}-${d}`
  }
  return `${y}-${m}-${d} ${h}:${minute}:${second}`
});
Vue.filter('filterNum', function (value) {
  if (value<10000) {
    return value
  }else if(value>=10000&&value<20000){
    return '1万'
  }else if(value>=20000&&value<30000){
    return '2万'
  }else if(value>=30000&&value<40000){
    return '3万'
  }else if (value>=40000&&value<50000){
    return '4万'
  }else if (value>=50000){
    return '5万'
  }else{
    return ''
  }
})
Vue.filter('filterPhoneCost',function(value){
  if (value<1) {
    return '0'
  }else if(value>=1&&value<2){
    return '1'
  }else if(value>=2){
    return '2'
  }
})
new Vue({
  // routers,
  render: r => r(App)
}).$mount('#app')
