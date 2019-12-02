import Vue from 'vue'
import Loading from './loading.vue'

Loading.newInstance = properties => {
  const _props = properties || {}
  const Instance = new Vue({
    data: Object.assign({}, _props, {}),
    render (h) {
      let vnode = h(Loading)
      if (this.render) {
        vnode = h(Loading, {}, [this.render(h)])
      }
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
        if (document.getElementsByClassName('box-loading__section')[0] !== undefined) {
          document.body.removeChild(document.getElementsByClassName('box-loading__section')[0])
        }
        cb()
      }, 500)
    },
    component
  }
}

export default Loading
