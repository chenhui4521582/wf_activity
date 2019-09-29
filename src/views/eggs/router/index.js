import Vue from 'vue'
import Router from 'vue-router'
// const v=GLOBALS.getUrlParam('v').split('#/')[0]||1
// const index = resolve => require([`../pages${v==1?'':v}/index.vue`], resolve)
// const before = resolve => require([`../pages${v==1?'':v}/before.vue`], resolve)
// const after = resolve => require([`../pages${v==1?'':v}/after.vue`], resolve)
const index = resolve => require([`../pages2/index.vue`], resolve)
const before = resolve => require([`../pages2/before.vue`], resolve)
const after = resolve => require([`../pages2/after.vue`], resolve)
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
