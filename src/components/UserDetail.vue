<template>
  <div>
    <p>{{ user }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        user: {},
        access_token: 'eyJhbGciOiJIUzI1NiJ9.dXNlcjFAcGtjZC5jb211c2Vy.a0bsH5GJwpVk9x1Bh83w5v8ka2KoXHCUfYYDKdOcLKY'
      }
    },

    methods: {
      fetchData () {
        this.$http.get('users/{_id}/{?query*}', { params: {
          _id: this.$route.params._id,
          access_token: this.access_token
        }})
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.user = data
        })
      }
    },

    // ::::: LIFECYCLE HOOKS :::::
    created () {
      this.fetchData()
    }
  }
</script>
