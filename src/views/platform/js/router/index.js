import Router from 'vue-router'
import Vue from 'vue'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '',
    name: 'app',
    component: _import('App')
  }, {
    path: '/gameNews/:gameType',
    name: 'gameNews',
    component: _import('singleGame')
  }, {
    path: '/gameNewsDetails/:id/:fromWhichList',
    name: 'gameNewsDetails',
    component: _import('details')
  }, {
    path: '/activityDetails/:id',
    name: 'activityDetails',
    component: _import('activityDetails')
  }]
})
