<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="panel panel-default">
          <div class="panel-body container-fluid">
            <form @submit.prevent>
              <!-- NAME -->
              <div class="form-group col-sm-10 col-sm-offset-1">
                <label for="userName" class="control-label">Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="user.name">
              </div>

              <!-- EMAIL -->
              <div class="form-group col-sm-10 col-sm-offset-1">
                <label for="userEmail" class="control-label">
                  Email <span style="color: red;" v-if="$route.path.split('/').pop() == 'new'">*</span>
                </label>
                <input type="text" class="form-control" placeholder="Email" v-model="user.email">
              </div>

              <!-- PASSWORD -->
              <template v-if="user.type != 'facebook'">
                <div class="form-group col-sm-10 col-sm-offset-1">
                  <label for="userPassword" class="control-label">
                    Password <span style="color: red;" v-if="$route.path.split('/').pop() == 'new'">*</span>
                  </label>
                  <input type="password" class="form-control" placeholder="Password (Longer than 6 characters)" v-model="user.password">
                </div>
                <div class="form-group col-sm-10 col-sm-offset-1">
                  <label for="userConfirmPassword" class="control-label">
                    Confirm Password <span style="color: red;" v-if="$route.path.split('/').pop() == 'new'">*</span>
                  </label>
                  <input type="password" class="form-control" placeholder="Confirm Password" v-model="user.confirmPassword">
                </div>
              </template>
              <div class="form-group col-sm-10 col-sm-offset-1">
                <button class="btn btn-success btn-block" @click.prevent="submit" :disabled="disabled">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          name: null,
          email: null,
          password: null,
          confirmPassword: null
        }
      }
    },

    methods: {
      fetchData () {
        this.user = {}

        this.$http.get('users/{_id}/{?query*}', { params: {
          _id :this.$route.params._id,
          query: { access_token: this.access_token }
        }})
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.user = data
        })
      },

      submit () {
        switch (this.$route.path.split('/').pop()) {
          case 'new':
            this.$http.post('users', this.user, { params: {
              access_token: this.access_token
            }})
            .then(response => {
              console.log(response)
              if (response.status == 200) this.$router.push({ name: 'users' })
            })
            break

          case 'edit':
            this.$http.put('users/{_id}', this.user, {
              params: {
                _id: this.$route.params._id,
                access_token: this.access_token
              }
            })
            .then(response => {
              console.log(response)
              if (response.status == 200) this.$router.push({ name: 'users' })
            })
            break

          default:
            break
        }
      }
    },

    computed: {
      access_token () {
        return JSON.parse(localStorage.admin).token
      },

      disabled () {
        switch (this.$route.path.split('/').pop()) {
          case 'edit':
            return false
          case 'new':
            return !(this.user.email && (this.user.password.length >= 6) && this.user.confirmPassword && (this.user.password == this.user.confirmPassword))
          default:
            return true
        }
      }
    },

    // ::::: LIFECYCLE HOOKS :::::
    created () {
      if (this.$route.path.split('/').pop() == 'edit') this.fetchData()
    }
  }
</script>
