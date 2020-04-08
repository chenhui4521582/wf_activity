import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/productlist'
  },
  {
    path: '/productlist',
    name: 'productList',
    component: () => import('../views/productList/productList'),
    mate: {
      title: '话费券当钱花'
    }
  },
  {
    path: '/productdetail',
    name: 'productDetail',
    component: () => import('../views/productDetail/productDetail'),
    mate: {
      title: '商品详情'
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order/order'),
    mate: {
      title: '我的订单'
    }
  },
  {
    path: '/orderdetail',
    name: 'orderDetail',
    component: () => import('../views/orderDetail/orderDetail'),
    mate: {
      title: '确认订单'
    }
  },
  {
    path: '/evaluation',
    name: 'evaluation',
    component: () => import('../views/evaluation/evaluation'),
    mate: {
      title: '评价晒单'
    }
  }
]

export default new Router({ routes })

