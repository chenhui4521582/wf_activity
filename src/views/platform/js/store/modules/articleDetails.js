import axios from '../../fetch'
import api from '../../api'

const getarticle = id => {
  return axios.post(api.singleNews, {
    id
  })
}

const getactivity = id => {
  return axios.post(api.singleHotActivities, {
    id
  })
}

const articleDetailsInfo = {
  state: {
    data: {},
    fromWhichList: '',
    activityData: {}
  },
  mutations: {
    GETARTICLE: (state, data) => {
      state.data = data.res
      state.fromWhichList = data.fromWhichList
    },
    GETACTIVITY: (state, data) => {
      state.activityData = data
    }
  },
  actions: {
    GetArticle ({
      commit
    }, params) {
      return new Promise(resolve => {
        getarticle(params.id).then(res => {
          res.data.url = res.data.gameUrl
          commit('GETARTICLE', {
            res: res.data,
            fromWhichList: params.fromWhichList
          })
          resolve()
        })
      })
    },
    GetActivity ({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        getactivity(params.id).then(res => {
          if (res.data) {
            commit('GETACTIVITY', res.data)
            resolve()
          } else {
            reject('没有信息')
          }
        })
      })
    }
  }
}
export default articleDetailsInfo
