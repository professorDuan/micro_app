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
    const execScripts = async(name,proxy) => {
        const scripts = await getExternalScripts()
        scripts.forEach(script => eval.call(proxy, script))
        return proxy[name]
    }
 
    return {
        template,
        getExternalScripts,
        execScripts
    }
}