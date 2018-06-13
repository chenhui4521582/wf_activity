import api from '../../api'
import axios from '../../fetch'

const getbannerlist = () => {
  return axios.post(api.bannerPic)
}

const bannerInfo = {
  state: {
    data: []
  },
  mutations: {
    GETBANNERLIST: (state, data) => {
      state.data = data
    }
  },
  actions: {
    getBannerList ({commit}) {
      return new Promise(resolve => {
        getbannerlist().then(res => {
          commit('GETBANNERLIST', res.data)
          resolve()
        })
      })
    }
  }
}
export default bannerInfo
