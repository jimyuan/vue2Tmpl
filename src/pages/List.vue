<template>
  <div>
    <h2 v-text="msg"></h2>
    <transition name="fade">
      <table class="table table-resp">
        <thead class="thead-inverse">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Desc.</th>
            <th>Create</th>
          </tr>
        </thead>
        <tbody v-if="!userData">
          <tr>
            <td colspan="4" data-row="result">Empty!</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="user in userData">
            <td v-text="user.firstName + ' ' + user.lastName" data-row="Name"></td>
            <td v-text="user.email" data-row="Email"></td>
            <td v-text="user.description" data-row="Desc."></td>
            <td v-text="user.createTime" data-row="Create"></td>
          </tr>
        </tbody>
      </table>
    </transition>
    <button class="btn btn-block btn-primary" @click="fetchUser" v-text="fetchStatus"></button>
  </div>
</template>

<script>
import userService from 'SERVICES/userService'

export default {
  data () {
    return {
      msg: 'LIST PAGE',
      userData: '',
      fetchStatus: 'Fetch!'
    }
  },

  watch: {
    // '$route': 'fetchUser, secMethod'
  },

  methods: {
    fetchUser () {
      this.fetchStatus = 'Fetching...'
      userService.fetch({
        username: 'Jean',
        gender: 'Female'
      })
      .then(data => {
        this.userData = data.users
        this.fetchStatus = 'Fetch Done!'
      })
    }
  }
}
</script>
