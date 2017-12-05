import 'normalize.css'
import Vue from 'vue'
import App from 'COMPONENTS/App'
import router from 'ROUTERS/'
import store from 'STORE/store'
import './filters/'
import './public/ElementComponents'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
