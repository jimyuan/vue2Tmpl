<template>
  <div class="userbar" :class="{active: token}">
    <span v-if="token">{{ user.userName }}, 欢迎您！<i @click="logout">退出</i></span>
    <span v-else>游客，欢迎您！<i @click="goLogin">登录</i></span>
  </div>
</template>

<script>
import * as types from 'STORE/types'
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },

  computed: mapState({
    user: state => state.user,
    token: state => state.token
  }),

  methods: {
    goLogin () {
      const route = this.$route
      const path = route.path
      const fullPath = route.fullPath
      const toPath = '/login'
      console.log(fullPath)
      if (path !== toPath) {
        this.$router.push({
          path: toPath, query: { redirect: fullPath }
        })
      }
    },

    logout () {
      this.$store.commit(types.LOGOUT)
      this.$router.push({ path: '/' })
    }
  }
}
</script>
