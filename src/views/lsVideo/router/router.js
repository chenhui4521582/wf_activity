import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'lsVideo',
    component: () => import('../views/index/index')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my/my')
  }
]

export default new Router({routes})