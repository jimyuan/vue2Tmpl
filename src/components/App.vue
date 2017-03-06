<template>
  <div id="app">
    <Userbar></Userbar>
    <Navbar></Navbar>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <Footinfo></Footinfo>
  </div>
</template>

<script>
import Userbar from './Userbar'
import Navbar from './Navbar'
import Footinfo from './Footer'

export default {
  data () {
    return {
      // transitionName: 'slide-left'
      transitionName: 'fade'
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.transitionName !== 'fade') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  components: { Userbar, Navbar, Footinfo }
}
</script>

<style lang="scss">
@import "../scss/docs";
</style>
