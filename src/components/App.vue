<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="view"></router-view>
    <img src="../assets/f-35-carrier-1920-home.jpg" alt="">
    <p>{{ footMsg }} <time>{{ time | dateTimeFormatter }}</time></p>
  </div>
</template>

<script>
import Navbar from './Navbar'

export default {
  components: { Navbar },
  data () {
    return {
      footMsg: 'This is foot.',
      time: Date.now()
    }
  }
}
</script>

<style lang="scss">
@import "../scss/docs";
</style>
