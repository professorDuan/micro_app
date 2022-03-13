import Home from '../components/Home/index.vue'
import About from '../components/About/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
];

export default createRouter({
  history: createWebHashHistory('/vue3'),
  routes,
});
