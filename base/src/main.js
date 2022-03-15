import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {registerMicroApps, start} from './custom_micro'
Vue.use(ElementUI)

const apps = [
  {
    name: 'vue2',
    entry: '//localhost:8001/',
    container: '#sonApp',
    activeRule: '/vue2'
  },
  {
    name: 'vue3',
    entry: '//localhost:8002/',
    container: '#sonApp',
    activeRule: '/vue3'
  },
  {
    name: 'react',
    entry: '//localhost:8003/',
    container: '#sonApp',
    activeRule: '/react'
  }
]

registerMicroApps(apps)
start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
