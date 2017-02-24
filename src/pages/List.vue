<template>
  <div>
    <h2 v-text="msg"></h2>
    <pre v-text="remote"></pre>
  </div>
</template>

<script>
import userService from '../services/userService'

export default {
  data () {
    return {
      msg: 'LIST PAGE',
      remote: 'no data',
      remote2: 'no data'
    }
  },

  created () {
    // this.fetchRemote()
    // this.secMethod()
    this.postRemote()
  },

  watch: {
    '$route': 'fetchRemote, secMethod'
  },

  methods: {
    fetchRemote () {
      userService.fetch({username: 'jim'})

      .then(data => {
        console.log(data)
        this.remote = data
      })
    },

    postRemote () {
      userService.postMsg({a: 1, b: 2})
      .then(data => {
        this.remote = data
      })
    },

    secMethod () {
      this.remote2 = 'show remote 2!'
    }
  }
}
</script>
