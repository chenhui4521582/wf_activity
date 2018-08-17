// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import axios from './js/fetch'
import App from './index'
import store from './js/store'
import moment from 'moment'
// import { Loading } from 'element-ui'
import router from './js/router'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast'
import api from './js/api'
import load from './plugins/loading'

// document.addEventListener('touchmove',function(event){event.preventDefault(); },false);
// Vue.use(Loading)
Vue.use(Toast)
Vue.use(load)
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.prototype.axios = axios
Vue.prototype.checkPoint = (params, userInfo, _this) => {
  /**
   * 埋点需求
   * @param {generate_time} 操作时间
   * @param {generate_date} 操作日期
   */
  const now = moment()
  params.channel_id = localStorage.getItem('APP_CHANNEL') // 渠道号
  params.generate_time = now.format('HH:mm:ss') // 操作时间
  params.generate_date = now.format('YYYY-MM-DD') // 操作日期
  params.project_id = 0
  // params.isShowToast = false
  if (userInfo && userInfo.amount != '' && userInfo.userId != '') {
    params.user_id = userInfo.userId
    params.residual_gold = userInfo.amount
    return axios.post(api.checkPoint, params)
  } else {
    return _this.$store.dispatch('setUserInfo').then(res => {
      params.user_id = res.userId
      params.residual_gold = res.amount
      return axios.post(api.checkPoint, params)
    })
  }
}
Vue.filter('filter', function (url) {
  if (url && !url.includes('http')) {
    return '//file.beeplay123.com' + url
  } else {
    return url
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  store,
  router,
  template: '<App/>',
  components: {
    App
  },
  mounted () {
    if (!localStorage.getItem('backToWap')) {
      localStorage.setItem('backToWap', location.href)
    }
  }
})
