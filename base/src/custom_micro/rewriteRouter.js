import { pathChange } from "./pathChange"

//重新定义路由跳转方法
let prevRouter = null
let currentRouter = null

export const getPrevRouter = () => prevRouter
export const getCurrentRouter = () => currentRouter

export const rewriteRouter = () => {
    //重新定义pushState和replaceState方法
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    history.pushState = function() {
        prevRouter = window.location.pathname
        originalPushState.apply(history, arguments)
        currentRouter = window.location.pathname
        console.log('push')
        pathChange()
    }
    history.replaceState = function() {
        prevRouter = window.location.pathname
        originalReplaceState.apply(history, arguments)
        currentRouter = window.location.pathname
        console.log('replace')
        pathChange()
    }
    //重新定义前进/后退方法
    window.addEventListener('popstate', function() {
        //此时页面路由已经变化了
        prevRouter = currentRouter
        currentRouter = window.location.pathname
        console.log('pop')
        pathChange()
    })
}