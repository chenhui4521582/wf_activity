import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['../pages/index.vue'], resolve)
const after = resolve => require(['../pages/after.vue'], resolve)
const sdk = resolve => require(['../pages/sdk.vue'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/after',
      name: 'after',
      component: after
    },
    {
      path: '/sdk',
      name: 'sdk',
      component: sdk
    }
  ]
})
