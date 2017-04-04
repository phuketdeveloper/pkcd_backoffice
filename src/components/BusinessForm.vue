<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <!-- COVER PHOTO -->
              <div class="center">
                <img id="cover" :src="image || coverSrc">
              </div>

              <!-- FORM -->
              <form class="col-sm-10 col-sm-offset-1" method="POST" enctype="multipart/form-data" ref="businessForm" @submit.prevent>
                <div class="form-group">
                  <input type="file" class="form-control" name="cover" v-show="false" ref="cover" @change="onFileChange">
                  <button class="btn btn-info btn-block" @click="virtualClick">Upload Cover Photo</button>
                </div>

                <div class="form-group">
                  <input type="text" class="form-control input-lg" placeholder="Name" name="name" v-model="business.name">
                </div>
                <div class="form-group">
                  <label for="businessDescription">Description</label>
                  <textarea class="form-control" rows="4" placeholder="Description" name="description" v-model="business.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="businessFacilities">Facilities</label>
                  <template v-for="(facility, index) in business.facilities">
                    <div class="row facility">
                      <div class="col-sm-11">
                        <input type="text" class="form-control" name="facilities" v-model="business.facilities[index]">
                      </div>
                      <div class="col-sm-1">
                        <button class="btn btn-link" @click="removeFacility(index)"><i class="glyphicon glyphicon-remove"></i></button>
                      </div>
                    </div>
                  </template>
                  <button class="btn btn-link" @click="addFacility">Add Facility</button>
                </div>
                <div class="form-group" v-show="false">
                  <label for="businessCategory">Category</label>
                  <input type="text" class="form-control" name="category" :value="business.category || category">
                </div>

                <!-- LOCATION -->
                <div class="page-header">
                  <h4>Location</h4>
                </div>

                <div class="container-fluid">
                  <div class="row">
                    <div class="form-group col-sm-12">
                      <label for="businessAddress">Address</label>
                      <textarea class="form-control" rows="2" placeholder="Address" name="address" v-model="business.address"></textarea>
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="">Latitude</label>
                      <input type="text" class="form-control" placeholder="Latitude" name="lat" v-model="business.coordinates.lat">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="">Longitude</label>
                      <input type="text" class="form-control" placeholder="Longitude" name="lng" v-model="business.coordinates.lng">
                    </div>
                  </div>
                </div>

                <!-- CONTACTS -->
                <div class="page-header">
                  <h4>Contacts</h4>
                </div>

                <div class="container-fluid">
                  <div class="row">
                    <div class="form-group col-sm-6">
                      <label for="businessTel">Tel</label>
                      <input type="text" class="form-control" placeholder="Tel" name="tel" v-model="business.contacts.tel">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="businessEmail">Email</label>
                      <input type="text" class="form-control" placeholder="Email" name="email" v-model="business.contacts.email">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="businessWebsite">Website</label>
                      <input type="text" class="form-control" placeholder="Website" name="website" v-model="business.contacts.website">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="businessFacebook">Facebook</label>
                      <input type="text" class="form-control" placeholder="Facebook (i.e. /pkcd)" name="facebook" v-model="business.contacts.facebook">
                    </div>
                  </div>
                </div>

                <!-- INFORMATION -->
                <template v-if="index != 'tours'">
                  <div class="page-header">
                    <h4>Information</h4>
                  </div>

                  <div class="container-fluid">
                    <div class="row">
                      <div class="form-group col-sm-12" v-if="index == 'hotels'">
                        <label for="businessPrice">Average Price</label>
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Average Price" name="price" v-model="business.price">
                          <span class="input-group-addon">THB / night</span>
                        </div>
                      </div>

                      <template v-if="index == 'hotels'">
                        <div class="form-group col-sm-6">
                          <label for="businessCheckInTime">Check-in Time</label>
                          <input type="text" class="form-control" placeholder="Check-in Time" name="checkInTime" v-model="business.checkInTime">
                        </div>

                        <div class="form-group col-sm-6">
                          <label for="businessCheckOutTime">Check-out Time</label>
                          <input type="text" class="form-control" placeholder="Check-out Time" name="checkOutTime" v-model="business.checkOutTime">
                        </div>
                      </template>

                      <template v-if="index != 'hotels'">
                        <div class="form-group col-sm-6">
                          <label for="businessOpenTime">Open Time</label>
                          <input type="text" class="form-control" placeholder="Open Time" name="openTime" v-model="business.openTime">
                        </div>

                        <div class="form-group col-sm-6">
                          <label for="businessCloseTime">Close Time</label>
                          <input type="text" class="form-control" placeholder="Close Time" name="closeTime" v-model="business.closeTime">
                        </div>
                      </template>
                    </div>
                  </div>
                </template>

                <br>

                <!-- BUTTONS -->
                <div class="form-group">
                  <button class="btn btn-success btn-block" @click.prevent="submit" :disabled="disabled">Submit</button>
                </div>
              </form>
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
        business: {
          name: null,
          description: null,
          address: null,
          contacts: { tel: null, email: null, website: null, facebook: null },
          coordinates: { lat: null, lng: null },
          price: null,
          checkInTime: null,
          checkOutTime: null,
          openTime: null,
          closeTime: null,
          facilities: [null]
        },

        image: null
      }
    },

    methods: {
      fetchData () {
        this.business = {}

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

      virtualClick () {
        this.$refs.cover.click()
      },

      submit () {
        let form = new FormData(this.$refs.businessForm)

        switch (this.$route.path.split('/').pop()) {
          case 'new':
            this.$http.post('businesses', form, {
              headers: { 'Content-Type': 'multipart/form-data' },
              params: {
                access_token: this.access_token
              }
            })
            .then(response => {
              console.log(response)
              if (response.status == 200) this.$router.push({ name: this.index })
            })
            break

          case 'edit':
            this.$http.put('businesses/{_id}', form, {
              headers: { 'Content-Type': 'multipart/form-data' },
              params: {
                _id: this.$route.params._id,
                access_token: this.access_token
              }
            })
            .then(response => {
              console.log(response)
              if (response.status == 200) this.$router.push({ name: `${this.category}Detail`, params: { _id: this.$route.params._id } })
            })
            break

          default:
            break
        }
      },

      onFileChange (event) {
        let files = event.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files[0])
        this.image = files[0]
      },

      createImage (file) {
        let image = new Image()
        let reader = new FileReader()
        let vm = this

        reader.onload = (event) => {
          vm.image = event.target.result
        }

        reader.readAsDataURL(file)
      },

      addFacility () {
        this.business.facilities.push(null)
      },

      removeFacility (index) {
        this.business.facilities.splice(index, 1)
      }
    },

    computed: {
      access_token () {
        return JSON.parse(localStorage.admin).token
      },

      coverSrc () {
        if (this.business.cover) {
          return 'http://128.199.205.55:49160/api/images/' + this.business.cover + '?access_token=' + this.access_token
          // return 'http://localhost:3003/api/images/' + this.business.cover + '?access_token=' + this.access_token
        } else {
          return 'http://placehold.it/500x300'
        }
      },

      category () {
        switch (this.index) {
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
          default:
            return ''
        }
      },

      index () {
        return this.$route.path.split('/')[1]
      },

      disabled () {
        return !this.business.name
      }
    },

    // ::::: LIFECYCLE HOOKS :::::
    created () {
      if (this.$route.path.split('/').pop() == 'edit') this.fetchData()
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

  .facility {
    padding-bottom: 5px;
  }
</style>
