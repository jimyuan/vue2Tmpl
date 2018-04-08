<template>
  <el-dialog :title="loginMsg" :visible="loginModal" width="300px">
    <el-form :model="user">
      <el-form-item>
        <el-input v-model="user.usr" :placeholder="placeHoler.usr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.pwd" :placeholder="placeHoler.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" size="small" @click="login" :disabled="loginValid">提交</el-button>
        <el-button plain size="small" @click="loginModal=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import userService from 'SERVICES/userService'

export default {
  data () {
    return {
      loginMsg: 'LOGIN PAGE',
      loginModal: false,
      user: {
        usr: 'user',
        pwd: '1234'
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

  watch: {
    '$route' () {
      this.loginModal = !!this.$route.query.redirect
    }
  },

  methods: {
    login () {
      userService.login(this.user)
        .then(({token, user}) => {
          if (token) {
            this.loginModal = false
            this.$store.commit('login', token)
            this.$store.commit('user', user)
            this.$router.push({
              path: this.$route.query.redirect || '/home'
            })
          }
        })
    }
  }
}
</script>
