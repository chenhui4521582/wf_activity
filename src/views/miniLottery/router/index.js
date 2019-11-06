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
    path: '/details',
    name: 'details',
    component: () => import('../views/details/details')
  },
  {
    path: '/log',
    name: 'log',
    component: () => import('../views/log/log')
  }
]

export default new Router({routes})
