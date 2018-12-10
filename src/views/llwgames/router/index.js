import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import login from '../login'
import forgetpwd from '../components/forgetPassword'
import register from '../components/register'
import home from '../components/home'
import entry from '../components/entry'

export default new VueRouter({
  routes: [
      {
          path: '/',
          name: 'entry',
          component: entry,
      },
      {
          path: '/login',
          name: 'login',
          component: login,
      },
      {
          path: '/forgetpwd',
          name: 'forgetpwd',
          component: forgetpwd,
      },
      {
          path: '/register',
          name: 'register',
          component: register,
      },
      {
          path: '/home',
          name: 'home',
          component: home,
      },
  ]
})
