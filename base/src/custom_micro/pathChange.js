import { importHTML } from "./importHTML"
import { getCurrentApp, getPrevApp } from "./utils"

export const pathChange = async() => {
    const currentApp = getCurrentApp()
    const prevApp = getPrevApp()
    //卸载之前的子应用
    if (prevApp) { 
        await _unmount(prevApp)
    }
    if (!currentApp) return
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
    await _bootstrap(currentApp)
    await _mount(currentApp)
}

async function _bootstrap(app){
    await app.bootstrap?.()
}

async function _mount(app){
    await app.mount?.()
}

async function _unmount(app){
    await app.unmount?.()
}