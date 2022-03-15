export const importHTML = async(url) => {
    const template = document.createElement('div')
    const text = await fetch(url).then(res => res.text())
    template.innerHTML = text
    const scripts = template.querySelectorAll('script')
    //获取所有script标签
    const getExternalScripts = () => {
        return Promise.all([...scripts].map(script => {
            const src = script.getAttribute('src')
            if (src) {
                return fetch(src.startsWith('http') ? src: `${url}${src}`).then(res => res.text())
            } else {
                return Promise.resolve(script.innerHTML)
            }
        }))
    }
    //执行script脚本
    const execScripts = async() => {
        const scripts = await getExternalScripts()
        //手动构建一个CommonJS环境
        const module = {exports: {}}
        const exports = {}
        scripts.forEach(script => eval(script))
        //返回的exports里有三个协议方法
        return module.exports
    }
 
    return {
        template,
        getExternalScripts,
        execScripts
    }
}