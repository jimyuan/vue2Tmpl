<template>
  <div id="app">
    <Userbar :is-login="isLogin" :user-name="userName"></Userbar>
    <Navbar></Navbar>
    <router-view class="view"></router-view>
    <Footinfo></Footinfo>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Userbar from './Userbar'
import Navbar from './Navbar'
import Footinfo from './Footer'
import userService from 'SERVICES/userService'

export default {
  components: { Userbar, Navbar, Footinfo },

  data () {
    return {
      userName: '',
      isLogin: false
    }
  },

  watch: {
    '$route': 'chkLogin'
  },

  methods: {
    chkLogin () {
      const sessionId = Cookie.get('sessionId')
      if (sessionId) {
        this.userName = 'Jimyuan'
        this.isLogin = userService.isLogin = true
      } else {
        this.isLogin = userService.isLogin = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "../scss/docs";
</style>
