export default class Custom {
    //事件监听(要在触发前定义)
    on(name, callback) {
        window.addEventListener(name, function(e) {
            callback(e.detail)
        })
    }
    //事件触发
    emit(name, data) {
        window.dispatchEvent(new CustomEvent(name, {detail: data}))
    }
}