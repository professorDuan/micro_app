//代理沙箱
export default class ProxySandbox {
    constructor() {
        this.proxy = null
        //所有对window的改动获取都通过这个对象来完成
        this.fakeWindow = {}
    }
    active() {
        this.proxy = new Proxy(window, {
            get(target, key) {
                //例如window.addEventListener('xx',function(){}),如果此时window是代理的对象,那么回调函数中的this指向的是代理对象可能会有问题,需要改回成window
                if (typeof target[key] === 'function') {
                    return target[key].bind(target)
                }
                return this.fakeWindow[key] || target[key]
            },
            set(target, key, value) {
                this.fakeWindow[key] = value
                return true
            }
        })
    }
    inactive() {}
}