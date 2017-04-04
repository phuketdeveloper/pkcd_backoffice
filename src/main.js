import Vue         from 'vue'
import VueRouter   from 'vue-router'
import VueResource from 'vue-resource'
import App         from './App.vue'

import Bootstrap  from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { routes } from './routes'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = 'http://128.199.205.55:49160/api'
// Vue.http.options.root = 'http://localhost:3003/api'

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    if (!localStorage.admin) router.push({ name: 'home' })
  } else {
    if (from.path != '/') return next(localStorage.admin ? true : false)
  }

  return next()
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
