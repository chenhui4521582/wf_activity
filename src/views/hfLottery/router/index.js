import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'hfLottery',
      component: () => import('../views/list/list'),
      meta: {
        title: '游戏中心'
      }
    },
    {
      path: '/detail',
      name: 'lotteryDetail',
      component: () => import('../views/detail/detail'),
      meta: {
        title: '游戏中心'
      }
    }
  ]
})
export default router