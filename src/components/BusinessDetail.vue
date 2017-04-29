<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="panel panel-default">
          <div class="panel-body container-fluid">
            <div class="row">
              <!-- COVER -->
              <div class="center">
                <img :src="coverSrc" id="cover">
              </div>

              <h2 class="col-sm-8 col-sm-offset-1">{{ business.name }}</h2>

              <div class="col-sm-2" style="margin-top: 20px; margin-bottom: 10px;">
                <router-link
                  :to="$route.path + '/edit'"
                  tag="button"
                  class="btn btn-link">
                  <i class="glyphicon glyphicon-pencil"></i>
                </router-link>

                <button class="btn btn-link" @click="deleteConfirm"><i class="glyphicon glyphicon-trash"></i></button>
              </div>

              <!-- INFORMATION -->
              <div class="col-sm-10 col-sm-offset-1">
                <p><b v-if="business.price">Average Price:</b> {{ business.price }}</p>
                <p><b v-if="business.openTime">Open Time:</b> {{ business.openTime }}</p>
                <p><b v-if="business.closeTime">Close Time:</b> {{ business.closeTime }}</p>
                <p><b v-if="business.checkInTime">Check-in Time</b> {{ business.checkInTime }}</p>
                <p><b v-if="business.checkOutTime">Check-out Time:</b> {{ business.checkOutTime }}</p>
              </div>

              <p class="col-sm-10 col-sm-offset-1">{{ business.description }}</p>

              <!-- FACILITIES -->
              <div class="col-sm-10 col-sm-offset-1" v-if="business.facilities.length > 0">
                <h4>Facilities</h4>
                <ul>
                  <li v-for="facility in business.facilities">{{ facility }}</li>
                </ul>
              </div>

              <!-- ADDRESS, CONTACTS AND LOCATION -->
              <div class="col-sm-10 col-sm-offset-1 container-fluid">
                <h4>Address</h4>

                <div class="row">
                  <p class="col-sm-6">
                    {{ business.address }}
                  </p>

                  <ul class="col-sm-6 contacts">
                    <li v-if="business.contacts.website">
                      <img src="../assets/website-icon.png">
                      {{ business.contacts.website }}
                    </li>
                    <li v-if="business.contacts.tel">
                      <img src="../assets/tel-icon.png">
                      {{ business.contacts.tel }}
                    </li>
                    <li v-if="business.contacts.email">
                      <img src="../assets/email-icon.png">
                      {{ business.contacts.email }}
                    </li>
                    <li v-if="business.contacts.facebook">
                      <img src="../assets/facebook-icon.png">
                      {{ business.contacts.facebook }}
                    </li>
                    <li v-if="business.coordinates.lat && business.coordinates.lng">
                      <img src="../assets/location-icon.png">
                      {{ business.coordinates.lat }}, {{ business.coordinates.lng }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
        business: {}
      }
    },

    methods: {
      fetchData () {
        this.$http.get('businesses/{_id}/{?query*}', { params: {
          _id: this.$route.params._id,
          query: { access_token: this.access_token }
        }})
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.business = data
        })
      },

      deleteItem () {
        this.$http.delete('businesses/{_id}', { params: { _id: this.business._id } })
        .then(response => {
          this.$router.push({ name: this.index })
        })
      },

      deleteConfirm () {
        if (confirm(`Are you sure to delete ${this.business.name}`)) {
          this.deleteItem()
        }
      }
    },

    computed: {
      access_token () {
        return JSON.parse(localStorage.admin).token
      },

      coverSrc () {
        return this.$http.options.root + '/images/' + this.business.cover + '?access_token=' + this.access_token
      },

      index () {
        return this.$route.path.split('/')[1]
      }
    },

    // ::::: LIFECYCLE HOOKS :::::
    created () {
      this.fetchData()
    }
  }
</script>

<style scoped>
  #cover {
    padding-bottom: 10px;
  }

  .center {
    width: 500px;
    margin: auto;
  }

  .contacts {
    list-style: none;
  }

  .contacts li {
    padding-bottom: 10px;
  }

  .contacts li img {
    width: 25px;
    height: 25px;
  }
</style>
