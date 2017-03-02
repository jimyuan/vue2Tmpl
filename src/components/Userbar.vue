<template>
  <div class="userbar" :class="{active: isLogin}">
    <span v-if="isLogin">{{ userName }}, 欢迎您！<i @click="logout">退出</i></span>
    <span v-else>游客，欢迎您！<i @click="goLogin">登录</i></span>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  props: ['isLogin', 'userName'],
  data () {
    return {
    }
  },

  methods: {
    goLogin () {
      const route = this.$route
      const path = route.path
      const fullPath = route.fullPath
      const toPath = '/login'

      if (path !== toPath) {
        this.$router.push({
          path: toPath, query: { redirect: fullPath }
        })
      }
    },

    logout () {
      Cookie.remove('sessionId')
      this.$router.replace('/home?action=logout')
    }
  }
}
</script>
