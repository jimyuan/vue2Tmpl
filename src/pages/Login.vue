<template>
<div class="login">
  <h2>{{ loginMsg }}</h2>
  <div class="login-area">
    <div class="form-group">
      <input type="text" class="form-control" placeholder="用户名" autofocus v-model="user.usr">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="密码" v-model="user.pwd">
    </div>
      <button class="btn btn-primary" @click="login" :disabled="loginValid">提交</button>
      <button class="btn">取消</button>
  </div>
</div>
</template>

<script>
import userService from 'SERVICES/userService'
import * as types from 'STORE/types'

export default {
  data () {
    return {
      loginMsg: 'LOGIN PAGE',
      user: {
        usr: '',
        pwd: ''
      },
      placeHoler: {
        usr: '用户名',
        pwd: '密码'
      }
    }
  },

  computed: {
    loginValid () {
      return (this.user.usr === '' || this.user.pwd === '')
    }
  },

  methods: {
    login () {
      userService.login(this.user).then(data => {
        const token = data.token
        const user = data.user
        if (token) {
          this.$store.commit(types.LOGIN, token)
          this.$store.commit(types.USER, user)
          this.$router.push({ path: this.$route.query.redirect })
        }
      })
    }
  }
}
</script>
