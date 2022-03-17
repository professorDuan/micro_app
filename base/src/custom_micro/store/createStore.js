export const createStore = (initState = {}) => {
    //全局数据
    let store = initState
    let observers = []
    //搜集订阅者
    const subscribe = (callback) => {
        observers.push(callback)
    }
    //返回状态
    const getStore = () => {
        return store
    }
    //更新数据后通知所有订阅者依次执行
    const update = (newStore = {}) => {
        let originalStore = store
        store = newStore
        observers.forEach(async observer => await observer(newStore,originalStore))
    }
}