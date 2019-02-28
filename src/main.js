import 'normalize.css/normalize.css'
import '@/assets/scss/docs.scss'
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import svgIcon from '@/components/g-svg-icon'
import '@/permission'
import '@/filters'

Vue.config.productionTip = false
// 引入 Element UI
Vue.use(ElementUI)
// 引入全局组件 <svg-icon icon-class="icon-file-name" />
Vue.component('svg-icon', svgIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
