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
import LikeList from '../views/my/likelist.vue'
import Channel from '../views/find/channel'
import newSong from '../views/find/newsong'
import Rank from '../views/find/rank'
import Selected from '../views/mv/selected'
import Exclusive from '../views/mv/exclusive'
import AllMV from '../views/mv/allMV'
import Friend from '../views/friend'
import user from '../views/user'
import Artist from '../views/artist/artist.vue'
import hotsong from '../views/artist/menu/hotsong.vue'
import artistAlbum from '../views/artist/menu/album.vue'
import artistMv from '../views/artist/menu/mv.vue'
import artistDesc from '../views/artist/menu/desc.vue'

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
      name: 'Find',
      path: '/app/find',
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
      },
      {
        path: '/app/find/3',
        name: 'Channel',
        component: Channel
      },
      {
        path: '/app/find/4',
        name: 'RANK',
        component: Rank
      },
      {
        path: '/app/find/5',
        name: 'NewSong',
        component: newSong
      }]
    },
    {
      path: '/app/friend',
      name: 'Friend',
      component: Friend
    },
    {
      path: '/app/user',
      name: user,
      component: user
    },
    {
      path: '/app/mv',
      name: 'MV',
      component: MV,
      children: [{
        path: '/app/mv/1',
        name: 'Selected',
        component: Selected
      },
      {
        path: '/app/mv/2',
        name: 'Exclusive',
        component: Exclusive
      },
      {
        path: '/app/mv/3',
        name: 'AllMV',
        component: AllMV
      }]
    },
    {
      path: '/app/my',
      name: 'MY',
      component: My
    },
    {
      path: '/app/my/likelist',
      name: 'Likelist',
      component: LikeList
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
    },
    {
      path: '/app/artist',
      component: Artist,
      name: 'Artist',
      children: [{
        path: '/app/artist/hotsong',
        component: hotsong,
        name: 'HotSong'
      },
      {
        path: '/app/artist/album',
        component: artistAlbum,
        name: 'Artist_album'
      },
      {
        path: '/app/artist/mv',
        component: artistMv,
        name: 'Artist_mv'
      },
      {
        path: '/app/artist/desc',
        component: artistDesc,
        name: 'Artist_desc'
      }]
    }]
  }
]

const router = new Router({
  routes
})

export default router
