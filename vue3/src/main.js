import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

let instance = null

function render() {
    instance = createApp(App)
    instance.use(router).mount('#app')
}

if (!window.__CUSTOM__MICRO) {
    render()
}

export const bootstrap = async () => {}

export const mount = async () => {
  render()
}

export const unmount = async () => {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}