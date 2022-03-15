import { getApps } from "./registerApps"
import { getCurrentRouter, getPrevRouter } from "./rewriteRouter"

export const getCurrentApp = () => {
    const apps = getApps()
    if (!apps.length) {
        return null
    }
    return apps.find(app => app.activeRule === getCurrentRouter())
}

export const getPrevApp = () => {
    
    const apps = getApps()
    if (!apps.length) {
        return null
    }
    return apps.find(app => app.activeRule === getPrevRouter())
}