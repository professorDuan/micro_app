import { importHTML } from "./importHTML"
//import SnapshotSandbox from "./sandbox/sanpshotSandbox"
import ProxySandbox from "./sandbox/proxySandbox"
import { getCurrentApp, getPrevApp } from "./utils"

export const pathChange = async() => {
    const currentApp = getCurrentApp()
    const prevApp = getPrevApp()
    if (prevApp) { 
        //让之前子应用全局数据清空
        prevApp.proxy && prevApp.proxy.inactive()
        //卸载之前的子应用
        await _unmount(prevApp)
    }
    if (!currentApp) return
    //启动子应用
    const {template, execScripts} = await importHTML(currentApp.entry)
    const container = document.querySelector(currentApp.container)
    container.appendChild(template)
    //配置全局变量
    window.__CUSTOM__MICRO = true
    if (!currentApp.proxy) {
        currentApp.proxy = new ProxySandbox()
    }
    //激活当前应用全局数据
    currentApp.proxy.active()
    const {bootstrap, mount, unmount} = await execScripts(currentApp.name, currentApp.proxy.proxy)
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