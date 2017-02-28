<template>
  <footer>
    <p>Update: {{ time | dateTimeFormatter }}</p>
  </footer>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      time: Date.now()
    }
  }
}
</script>
