<template>
  <div class="container">
    <!-- SIGNIN BOX -->
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3">
        <div class="panel panel-default">
          <div class="panel-body">
            <form>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Username" v-model="user.username">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" v-model="user.password">
              </div>
              <button class="btn btn-success btn-block" @click.prevent="signin">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import { eventBus } from '../main.js'

  export default {
    data () {
      return {
        user: {
          username: null,
          password: null
        },

        admin: {}
      }
    },

    methods: {
      signin () {
        this.$http.post('signin/admin', this.user)
        .then(response => {
          return response.json()
        })
        .then(data => {
          localStorage.setItem('admin', JSON.stringify(data))
          this.$router.push({ name: 'users' })
        })
      }
    }
  }
</script>
