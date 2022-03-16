import Vue from 'vue'
import App from './App.vue'
//import router from './router';
import store from './store';

Vue.config.productionTip = false

let instance = null

function render() {
  instance = new Vue({
    //router,
    store, 
    render: h => h(App)
  }).$mount('#app-vue')
}

//不是微前端环境下直接运行
if (!window.__CUSTOM__MICRO) {
  render()
}

//开始加载(一般做些加载前的参数处理操作)
export const bootstrap = async () => {}
//开始挂载到DOM上
export const mount = async () => {
  render()
}
//开始卸载
export const unmount = async () => {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}