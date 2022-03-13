import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import List from '../components/List'
Vue.use(VueRouter)

const baseUrl = '/vue2'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: baseUrl,
  routes
})

export default router
