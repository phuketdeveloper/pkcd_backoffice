<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <span class="navbar-brand">PKCD</span>
        </div>

        <template v-if="$route.path != '/'">
          <!-- LEFT -->
          <ul class="nav navbar-nav">
            <template v-for="tab in tabs">
              <router-link
                :to="tab.path"
                tag="li"
                active-class="active">
                <a>{{ tab.name }}</a>
              </router-link>
            </template>
          </ul>

          <!-- RIGHT -->
          <ul class="nav navbar-nav navbar-right">
            <li @click="signout"><a href="#">Sign out</a></li>
          </ul>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'

  export default {
    data () {
      return {
        tabs: [
          { name: 'Users', path: { name: 'users' } },
          { name: 'Attractions', path: { name: 'attractions' } },
          { name: 'Hotels', path: { name: 'hotels' } },
          { name: 'Restaurants', path: { name: 'restaurants' } },
          { name: 'Spas', path: { name: 'spas' } },
          { name: 'Tours', path: { name: 'tours' } }
        ]
      }
    },

    methods: {
      signout () {
        this.$router.push({ name: 'home' })
        localStorage.removeItem('admin')
      }
    }
  }
</script>
