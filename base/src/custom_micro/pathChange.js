import { importHTML } from "./importHTML"
import SandBox from "./sandbox/sanpshotSandbox"
import { getCurrentApp, getPrevApp } from "./utils"

//可能是一个返回Promise的函数，也可能是多个返回Promise的函数的数组集合，因此将它们串联起来依次执行
const compose = (fns) => {
    fns = Array.isArray(fns) ? fns : [fns]
    //给每个Promise传入props
    return props => fns.reduce((chain, p) => chain.then(() => p(props)), Promise.resolve())
}

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
        currentApp.proxy = new SandBox()
    }
    //激活当前应用全局数据
    currentApp.proxy.active()
    const {bootstrap, mount, unmount} = await execScripts(currentApp.name, currentApp.proxy.proxy)
    currentApp.bootstrap = compose(bootstrap)
    currentApp.mount = compose(mount)
    currentApp.unmount = compose(unmount)
    await _bootstrap(currentApp)
    await _mount(currentApp)
}

async function _bootstrap(app){
    await app.bootstrap?.(app.props)
}

async function _mount(app){
    await app.mount?.()
}

async function _unmount(app){
    await app.unmount?.()
}