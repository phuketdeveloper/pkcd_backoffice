<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div>
          <!-- "ADD" BUTTON -->
          <router-link
            :to="newPath"
            tag="button"
            class="btn btn-success">
            <i class="glyphicon glyphicon-plus"></i> Add
          </router-link>

          <br><br>

          <!-- LIST -->
          <div class="list-group">
            <!-- BUSINESS LIST -->
            <template v-if="$route.name != 'users'" v-for="item in items">
              <router-link
                :to="$route.path + item._id"
                tag="a"
                class="list-group-item">
                {{ item.name }}

                <div class="btn btn-group">
                  <router-link
                    :to="$route.path + item._id + '/edit'"
                    tag="button"
                    class="btn btn-default">
                    <i class="glyphicon glyphicon-pencil"></i>
                  </router-link>

                  <button type="button" class="btn btn-default" @click="selectItem(item)">
                    <i class="glyphicon glyphicon-trash"></i>
                  </button>
                </div>
              </router-link>
            </template>

            <!-- USER LIST -->
            <template v-if="$route.name == 'users'" v-for="item in items">
              <li class="list-group-item">
                {{ item.name || item.email || item.username }}

                <div class="btn btn-group">
                  <router-link
                    :to="$route.path + item._id + '/edit'"
                    tag="button"
                    class="btn btn-default">
                    <i class="glyphicon glyphicon-pencil"></i>
                  </router-link>

                  <button class="btn btn-default" v-if="item.type != 'admin'" @click="selectItem(item)">
                    <i class="glyphicon glyphicon-trash"></i>
                  </button>
                </div>
              </li>
            </template>
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
        items: [],
        deleteButtonPressed: false,
        selectedItem: null
      }
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData () {
        let query = { access_token: this.access_token }
        let url = this.baseURL
        url += '/{?query*}'
        if (this.$route.name != 'users') {
          query.category = this.category
          query.contents = 'listed'
        }

        this.$http.get(url, { params: { query }})
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.items = data
        })
      },

      selectItem (item) {
        this.deleteButtonPressed = true
        this.selectedItem = item
      },

      deselectItem () {
        this.deleteButtonPressed = false
        this.selectedItem = null
      },

      deleteItem (item) {
        this.$http.delete('businesses/{_id}/{?query*}', { params: {
          _id: item._id,
          query: { access_token: this.access_token }
        }})
        .then(response => {
          console.log(response)
          this.fetchData()
        })
      }
    },

    computed: {
      access_token () {
        return JSON.parse(localStorage.admin).token
      },

      category () {
        switch (this.$route.name) {
          case 'attractions':
            return 'attraction'
          case 'hotels':
            return 'hotel'
          case 'restaurants':
            return 'restaurant'
          case 'spas':
            return 'spa'
          case 'tours':
            return 'tour'
        }
      },

      newPath () {
        return this.$route.path + 'new'
      },

      index () {
        return this.$route.path.split('/')[1]
      },

      baseURL () {
        if (this.$route.name == 'users') {
          return 'users'
        } else {
          return 'businesses'
        }
      }
    },

    // ::::: LIFECYCLE HOOKS :::::
    created () {
      this.fetchData()
    },

    beforeRouteLeave (to, from, next) {
      if (this.deleteButtonPressed) {
        if (confirm(`Are you sure to delete ${this.selectedItem.name || this.selectedItem.email}?`)) {
          this.deleteItem(this.selectedItem)
          next(false)
        } else {
          next(false)
        }

        this.deselectItem()
      } else {
        next()
      }
    }
  }
</script>
