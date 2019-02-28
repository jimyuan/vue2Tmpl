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
import NavBar from '@/components/NavBar'
import FootInfo from '@/components/FootInfo'

export default {
  components: { NavBar, FootInfo }
}
</script>
