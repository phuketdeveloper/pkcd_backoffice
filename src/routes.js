import Signin         from './components/Signin.vue'
import Main           from './components/Main.vue'
import BusinessDetail from './components/BusinessDetail.vue'
import BusinessForm   from './components/BusinessForm.vue'
import List           from './components/List.vue'
import UserDetail     from './components/UserDetail.vue'
import UserForm       from './components/UserForm.vue'

export const routes = [
  { path: '/', name: 'home', component: Signin },
  { path: '/users', component: Main, children: [
    { path: '', name: 'users', component: List },
    { path: '/users/new', component: UserForm },
    { path: '/users/:_id', component: UserDetail },
    { path: '/users/:_id/edit', component: UserForm }
  ] },
  { path: '/attractions', component: Main, children: [
    { path: '', name: 'attractions', component: List },
    { path: '/attractions/new', component: BusinessForm },
    { path: '/attractions/:_id', name: 'attractionDetail', component: BusinessDetail },
    { path: '/attractions/:_id/edit', component: BusinessForm }
  ] },
  { path: '/hotels', component: Main, children: [
    { path: '', name: 'hotels', component: List },
    { path: '/hotels/new', component: BusinessForm },
    { path: '/hotels/:_id', name: 'hotelDetail', component: BusinessDetail },
    { path: '/hotels/:_id/edit', component: BusinessForm }
  ] },
  { path: '/restaurants', component: Main, children: [
    { path: '', name: 'restaurants', component: List },
    { path: '/restaurants/new', component: BusinessForm },
    { path: '/restaurants/:_id', name: 'restaurantDetail', component: BusinessDetail },
    { path: '/restaurants/:_id/edit', component: BusinessForm }
  ] },
  { path: '/spas', component: Main, children: [
    { path: '', name: 'spas', component: List },
    { path: '/spas/new', component: BusinessForm },
    { path: '/spas/:_id', name: 'spaDetail', component: BusinessDetail },
    { path: '/spas/:_id/edit', component: BusinessForm }
  ] },
  { path: '/tours', component: Main, children: [
    { path: '', name: 'tours', component: List },
    { path: '/tours/new', component: BusinessForm },
    { path: '/tours/:_id', name: 'tourDetail', component: BusinessDetail },
    { path: '/tours/:_id/edit', component: BusinessForm }
  ] },
  { path: '*', redirect: { name: 'home' } }
]
