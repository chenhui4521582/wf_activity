import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '游戏中心'
    },
    component: () => import('../pages/index'),
    redirect: {
      name: 'BlindBox'
    },
    children: [
      {
        path: '/blindBox',
        name: 'BlindBox',
        component: () => import('../pages/blindBox'),
        meta: {
          title: '盲盒'
        }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../pages/my'),
        meta: {
          title: '我的'
        }
      },
      {
        path: '/boxRecord',
        name: 'BoxRecord',
        component: () => import('../pages/boxRecord'),
        meta: {
          title: '开盒记录'
        }
      },
      {
        path: '/myPrize',
        name: 'MyPrize',
        component: () => import('../pages/myPrize'),
        meta: {
          title: '我的奖品'
        }
      }
    ]
  }
]

const router = new Router({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
