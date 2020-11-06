import Vue from 'vue'
import VueRouter from 'vue-router'
import MobileLogin from '../views/home/components/mobile.vue'
import Home from '../views/home/index.vue'
import EmailLogin from '../views/home/components/email.vue'
import Register from '../views/home/components/register.vue'
import APP from '../views/app/app.vue'
import Find from '../views/find/index.vue'
import MV from '../views/mv/index.vue'
import Recommond from '../views/find/recommond'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mobileLogin',
    name: 'MobileLogin',
    component: MobileLogin
  },
  {
    path: '/emailLogin',
    name: 'EmailLogin',
    component: EmailLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/app',
    name: 'APP',
    component: APP,
    children: [{
      path: '/app/find',
      name: 'Find',
      component: Find,
      children: [{
        path: '/app/find/1',
        name: 'Recommond',
        component: Recommond
      }]
    },
    {
      path: '/app/mv',
      name: 'MV',
      component: MV
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
