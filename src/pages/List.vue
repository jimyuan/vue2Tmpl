<template>
  <div>
    <h2 v-text="msg"></h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Desc.</th>
          <th>Create</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="userData.length>0">
          <tr v-for="user of userData">
            <td v-text="user.firstName+' '+user.lastName"></td>
            <td v-text="user.email"></td>
            <td v-text="user.description"></td>
            <td v-text="user.createTime"></td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4" style="text-align: center;">Empty Data!</td>
        </tr>
      </tbody>
    </table>
    <el-button type="primary" size="small" plain  @click="fetchUser" v-text="fetchStatus"></el-button>
    <el-button size="small" plain @click="resetFetch">Reset</el-button>
  </div>
</template>

<script>
import userService from 'SERVICES/userService'

export default {
  data () {
    return {
      msg: 'LIST PAGE',
      userData: [],
      emptyText: 'Empty Data!',
      fetchStatus: 'Fetch!'
    }
  },

  watch: {
    // '$route': 'fetchUser, secMethod'
  },

  methods: {
    fetchUser () {
      this.fetchStatus = 'Fetching...'
      userService.fetch({ username: 'Jean', ender: 'Female' })
        .then(data => {
          this.userData = data.users
          this.fetchStatus = 'Fetch Done!'
        })
    },
    resetFetch () {
      this.userData = []
      this.fetchStatus = 'Fetch!'
    }
  }
}
</script>
