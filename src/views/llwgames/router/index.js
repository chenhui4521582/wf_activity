import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import login from '../login'
import forgetpwd from '../components/forgetPassword'
import register from '../components/register'
export default new VueRouter({
    // mode: 'history',
  routes: [
      {
          path: '/',
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
  ]
})
