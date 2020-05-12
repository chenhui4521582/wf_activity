import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'masterStrategy',
    component: () => import('../views/index/index')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../views/ranking/ranking')
  }
]

export default new Router({ routes })