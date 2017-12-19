<template>
  <div>
    <h2 v-text="msg"></h2>
    <table class="table">
      <thead>
        <tr>
          <th v-for="ts of tabSort" v-text="ts"></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="userData.length>0">
          <tr v-for="user of userData" :key="user.id">
            <td>
              <input type="checkbox" name="chkUser" :value="user.id" v-model="userIds">
            </td>
            <td v-text="`${user.firstName} ${user.lastName}`"></td>
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
      tabSort: [],
      userData: [],
      userIds: [],
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
      const req = [
        userService.getSort(),
        userService.fetch({ username: 'Jean', ender: 'Female' })
      ]
      Promise.all(req)
        .then(([sortData, userList]) => {
          this.tabSort = ['', ...sortData.sort]
          this.userData = userList.users
          this.fetchStatus = 'Fetch Done!'
        })
        .catch(() => {
          this.fetchStatus = 'Fetch Error!'
        })
    },
    resetFetch () {
      this.userData = []
      this.fetchStatus = 'Fetch!'
    }
  },
  created () {
    this.fetchUser()
  }
}
</script>
