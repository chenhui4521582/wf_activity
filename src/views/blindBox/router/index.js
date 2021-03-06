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
        path: '/score',
        name: 'Score',
        component: () => import('../pages/score'),
        meta: {
          title: '积分'
        }
      },
      {
        path: '/scoreDetail',
        name: 'ScoreDetail',
        component: () => import('../pages/scoreDetail'),
        meta: {
          title: '积分明细'
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
        path: '/coupon',
        name: 'Coupon',
        component: () => import('../pages/coupon'),
        meta: {
          title: '优惠券'
        }
      },
      {
        path: '/chooseBox/:type',
        name: 'ChooseBox',
        component: () => import('../pages/chooseBox'),
        meta: {
          title: '选择盲盒'
        }
      },
      {
        path: '/openBox/:type',
        name: 'OpenBox',
        component: () => import('../pages/openBox'),
        meta: {
          title: '获得盲盒'
        }
      },
      {
        path: '/receiveGoods',
        name: 'ReceiveGoods',
        component: () => import('../pages/receiveGoods'),
        meta: {
          title: '领取实物'
        }
      },
      {
        path: '/allProducts',
        name: 'AllProducts',
        component: () => import('../pages/allProducts'),
        meta: {
          title: '所有商品'
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
      },
      {
        path: '/rankingList',
        name: 'RankingList',
        component: () => import('../pages/rankingList'),
        meta: {
          title: '幸运榜单'
        }
      },
      {
        path: '/faq',
        name: 'Faq',
        component: () => import('../pages/faq'),
        meta: {
          title: '常见问题'
        }
      },
      {
        path: '/userlogin',
        name: 'userLogin',
        component: () => import('../pages/userLogin/userLogin'),
        meta: {
          title: '开盲盒 100%中奖'
        }
      },
      {
        path: '/bindwechat',
        name: 'bindWechat',
        component: () => import('../pages/bindWechat/bindWechat'),
        meta: {
          title: '关注公众号'
        }
      },
      {
        path: '/loading',
        name: 'loading',
        component: () => import('../pages/loading/loading'),
        meta: {
          title: ''
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
