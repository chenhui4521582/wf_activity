import Loading from './loading.js'

let loadingInstance

function getLoadingInstance (render = undefined) {
  loadingInstance = loadingInstance || Loading.newInstance({
    render
  })
  return loadingInstance
}

function initLoading (options) {
  const render = ('render' in options) ? options.render : undefined
  let instance = getLoadingInstance(render)
  instance.show()
}

Loading.show = (props = {}) => initLoading(props)
Loading.hide = () => {
  if (!loadingInstance) return
  const instance = getLoadingInstance()
  instance.remove(() => {
    loadingInstance = null
  })
}

export default Loading
