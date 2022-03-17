import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {registerMicroApps, start} from './custom_micro'
import Custom from './custom_micro/store/customEvent'
Vue.use(ElementUI)

//实例化Custom对象
const custom = new Custom()
//让子应用中可以获取
window.custom = custom
//接收到子应用触发的login事件
custom.on('login', function(data) {
  console.log(data)
})

const apps = [
  {
    name: 'vue',
    entry: '//localhost:8001/',
    container: '#sonApp',
    activeRule: '/vue'
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
