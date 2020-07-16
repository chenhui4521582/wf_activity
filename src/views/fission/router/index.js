import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index/index')
  },
  {
    path: '/log',
    name: 'log',
    component: () => import('../views/log/log')
  },
  {
    path: '/award',
    name: 'award',
    component: () => import('../views/award/award')
  }
]

export default new Router({routes})
