import axios from '../../fetch'
import API from '../../api'

const getUserInfo = () => {
  return axios.post(API.UserTransInfo)
}

const userInfo = {
  state: {
    amount: '',
    userId: ''
  },
  mutations: {
    SETUSERINFO: (state, data) => {
      state.amount = data.amount
      state.userId = data.userId
    }
  },
  actions: {
    setUserInfo ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then((res, rej) => {
            if (res.code == 200) {
              commit('SETUSERINFO', res.data)
              resolve(res.data)
            } else {
              reject()
            }
          })
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}

export default userInfo
