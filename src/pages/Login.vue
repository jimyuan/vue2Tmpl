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
      <button class="btn btn-primary" @click="login">提交</button>
      <button class="btn">取消</button>
  </div>
</div>
</template>

<script>
import userService from 'SERVICES/userService'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      loginMsg: 'LOGIN PAGE',
      user: {},
      placeHoler: {
        usr: '用户名',
        pwd: '密码'
      }
    }
  },

  methods: {
    login () {
      userService.login(this.user)
        .then(data => {
          Cookie.set('sessionId', data.sessionId, { path: '/', expires: 7 })
          console.log('ok')
          this.$router.replace(this.$route.query.redirect)
        })
    }
  }
}
</script>
