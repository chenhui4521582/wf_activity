import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['../pages/index.vue'], resolve)
const detail = resolve => require(['../pages/detalis.vue'], resolve)
const schedule = resolve => require(['../pages/schedule.vue'], resolve)
// const index = resolve => require(['../components/index.vue'], resolve)
// const detail = resolve => require(['../components/detail.vue'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: schedule
    }
  ]
})
