import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['../pages/index.vue'], resolve)
const before = resolve => require(['../pages/before.vue'], resolve)
const after = resolve => require(['../pages/after.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/before',
      name: 'before',
      component: before
    },
    {
      path: '/after',
      name: 'after',
      component: after
    }
  ]
})
