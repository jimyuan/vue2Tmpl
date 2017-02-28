<template>
  <div>
    <h2>{{ msg }}</h2>
    <p v-text="time"></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'HOME PAGE'
    }
  },

  computed: {
    time () {
      return this.$parent.time
    }
  },

  created () {
    console.log(this.$root)
  }
}
</script>
