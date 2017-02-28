<template>
  <div class="login">
    <h2>{{ loginMsg }}</h2>
    <div class="form-login">
      <input type="text" v-model="user.usr" placeholder="用户名">
      <input type="password" v-model="user.pwd" placeholder="密码">
      <button class="btn btn-primary">提交</button>
      <button class="btn">取消</button>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>
