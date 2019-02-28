<template>
  <footer class="foot-info">
    <p>Update: {{ time | dateTimeFormatter(3) }}</p>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      time: Date.now()
    }
  }
}
</script>
