<template>
  <div id="app">
    <Userbar></Userbar>
    <Navbar></Navbar>
    <router-view class="view"></router-view>
    <Footinfo></Footinfo>
  </div>
</template>

<script>
import Userbar from './Userbar'
import Navbar from './Navbar'
import Footinfo from './Footer'

export default {
  components: { Userbar, Navbar, Footinfo }
}
</script>

<style lang="scss">
@import "../scss/docs";
</style>
