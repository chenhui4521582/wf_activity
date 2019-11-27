import Vue from 'vue'
import Loading from './loading.vue'

Loading.newInstance = properties => {
  const _props = properties || {}
  const Instance = new Vue({
    data: Object.assign({}, _props, {}),
    render (h) {
      let vnode = h(Loading)
      return vnode
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)

  return {
    show () {
      component.visible = false
    },
    remove (cb) {
      setTimeout(() => {
        component.$destroy
        cb()
      }, 500)
    },
    component
  }
}

export default Loading
