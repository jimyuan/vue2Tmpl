import Vue from 'vue'
import App from 'COMPONENTS/App'
import router from './routers/'
import './filters/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
