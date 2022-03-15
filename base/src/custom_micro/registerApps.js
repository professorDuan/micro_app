let _apps = []

export const getApps = () => _apps

export default (apps) => {
    _apps = apps
}