import 'normalize.css'
import './public/ElementComponents'
import Vue from 'vue'
import App from './App'
import router from 'ROUTERS/'
import store from 'STORE/store'
import './filters/'
// 该 polyfill 用在 IE 核心浏览器中，按需开启吧
// import 'babel-polyfill'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
