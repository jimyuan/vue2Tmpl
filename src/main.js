import Vue from 'vue'
import App from 'COMPONENTS/App'
import router from './routers/'
import './filters/'

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
