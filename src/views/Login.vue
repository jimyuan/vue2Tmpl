<template>
<div class="login">
  <h2>{{ loginMsg }}</h2>
  <el-form :model="user">
    <el-form-item>
      <el-input v-model="user.usr" :placeholder="placeHoler.usr"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="user.pwd" :placeholder="placeHoler.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary" size="small" @click="login" :disabled="loginValid">提交</el-button>
      <el-button plain size="small">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      loginMsg: 'LOGIN PAGE',
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

  methods: {
    login () {
      !this.loginValid && this.$store.dispatch('Login', this.user)
        .then(res => {
          this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>
