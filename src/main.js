import 'normalize.css'
import './public/ElementComponents'
import Vue from 'vue'
import App from './App'
import router from 'ROUTERS/'
import store from 'STORE/store'
import './filters/'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
