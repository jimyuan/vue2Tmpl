<template>
  <div>
    <h2>{{ msg }}</h2>
    <img src="../assets/logo.png" alt="">
    <p v-text="time"></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'HOME PAGE',
      pic: '../assets/logo.png'
    }
  },

  computed: {
    time () {
      return this.$parent.time
    }
  },

  created () {
  }
}
</script>
