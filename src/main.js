import 'normalize.css'
import Vue from 'vue'
import App from './components/App'
import router from './routers/'
import './filters/'

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
