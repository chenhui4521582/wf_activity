import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['../components/index.vue'], resolve)
const detail = resolve => require(['../components/detail.vue'], resolve)

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
    }
  ]
})
