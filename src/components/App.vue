<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="view"></router-view>
    <Footinfo></Footinfo>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Footinfo from './Footer'

export default {
  components: { Navbar, Footinfo },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
@import "../scss/docs";
</style>
