import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElementTiptapPlugin } from 'element-tiptap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-tiptap/lib/index.css'
import './style/iconfont.css'
import './style/theme/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
