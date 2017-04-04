<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import Nav from './components/Nav.vue'

  export default {
    name: 'app',

    components: {
      'app-nav': Nav
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
