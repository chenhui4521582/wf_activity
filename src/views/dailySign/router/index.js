import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['../pages/index.vue'], resolve)
const score = resolve => require(['../pages/myscore.vue'], resolve)
const rank = resolve => require(['../pages/rank.vue'], resolve)
const rules = resolve => require(['../pages/rules.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/score',
      name: 'score',
      component: score
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/rules',
      name: 'rules',
      component: rules
    }
  ]
})
