<template>
  <footer>
    <p>Update: {{ time | dateTimeFormatter }}</p>
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
