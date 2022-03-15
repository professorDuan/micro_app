import { importHTML } from "./importHTML"
import { getCurrentApp, getPrevApp } from "./utils"

export const pathChange = async() => {
    const currentApp = getCurrentApp()
    if (!currentApp) return
    const prevApp = getPrevApp()
    //卸载之前的子应用
    if (prevApp) { 
        //await unmount(prevApp)
    }
    //启动子应用
    const {template, execScripts} = await importHTML(currentApp.entry)
    const container = document.querySelector(currentApp.container)
    container.appendChild(template)
    //配置全局变量
    window.__CUSTOM__MICRO = true
    const {bootstrap, mount, unmount} = await execScripts()
    currentApp.bootstrap = bootstrap
    currentApp.mount = mount
    currentApp.unmount = unmount
    await bootstrap(currentApp)
    await mount(currentApp)
}

async function bootstrap(app){
    await app.bootstrap?.()
}

async function mount(app){
    await app.mount?.()
}

async function unmount(app){
    await app.unmount?.()
}