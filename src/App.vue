<template>
  <section id="app">
    <nav-bar></nav-bar>
    <transition name="fade" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
    <foot-info></foot-info>
  </section>
</template>

<script>
import NavBar from 'COMPONENTS/NavBar'
import FootInfo from 'COMPONENTS/FootInfo'

export default {
  components: { NavBar, FootInfo }
}
</script>

<style lang="scss">
@import "./assets/scss/docs";
</style>
