module.exports = {
    webpack(config){
        config.output.library = 'micro-react'
        config.output.libraryTarget = 'umd'
        config.output.globalObject = 'window'
        config.output.publicPath = '//localhost:8003/'
        return config
    },
    devServer(configFunction){
        return (proxy, allowedHost) => {
            const config = configFunction(proxy, allowedHost)
            config.headers = {
                "Access-Control-Allow-Origin": "*"
            }
            return config
        }
    }
}