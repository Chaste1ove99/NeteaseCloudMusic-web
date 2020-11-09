import Vue from 'vue'
import Router from 'vue-router'
import MobileLogin from '../views/home/components/mobile.vue'
import Home from '../views/home/index.vue'
import EmailLogin from '../views/home/components/email.vue'
import Register from '../views/home/components/register.vue'
import APP from '../views/app/app.vue'
import Find from '../views/find/index.vue'
import MV from '../views/mv/index.vue'
import Recommond from '../views/find/recommond'
import SongLists from '../views/find/songlist'
import My from '../views/my/index.vue'
import ListDetail from '../views/listdetail.vue'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 获取存在于vuex中的歌单ID
// const id = store.state.ListID

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
      },
      {
        path: '/app/find/2',
        name: 'SongLists',
        component: SongLists
      }]
    },
    {
      path: '/app/mv',
      name: 'MV',
      component: MV
    },
    {
      path: '/app/my',
      name: 'MY',
      component: My
    },
    // 别想着追加什么动态路由
    // 最简单的方法依然是利用query参数 实现新页面的定义
    // 在基础路由之上进行变化就行
    // 动态路由的问题在于 1.router不是响应式的 2.虽然获得了vuex的数据 但利用beforeEach时其实push操作已经发生
    // 这时候再获取vuex的数据 定义新的路由已经来不及了
    // warning: 实现大批量子页面的建立，没必要依靠动态路由
    // 只需要建立一个合理的父路由,然后依靠父路由设置query参数即可
    // 因为追加了query参数 不影响路由页面的读取 你只需要在同一个路由下用不同的query就能建立页面了
    {
      path: '/app/list',
      component: ListDetail
    }]
  }
]

const router = new Router({
  routes
})

export default router
