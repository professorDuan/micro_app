//沙箱快照(无法支持多实例,同一时间页面只能显示一个子应用)
export default class SnapshotSandbox {
    constructor() {
        this.proxy = window
        //快照对象
        this.snapshot = {}
        //修改对象
        this.modify = {}
    }
    active() {
        for (let key in window) {
            if (window.hasOwnProperty(key)) {
                this.snapshot[key] = window[key]
            }
        }
        //更新为最新状态
        for (let key in this.modify) {
            window[key] = this.modify[key]
        }
    }
    inactive() {
        for (let key in window) {
            if (window.hasOwnProperty(key) && window[key] !== this.snapshot[key]) {
                this.modify[key] = window[key]
                window[key] = this.snapshot[key]
            }
        }
    }
}