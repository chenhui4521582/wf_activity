import axios from '../../fetch'
import api from '../../api'
import moment from 'moment'
moment.locale('zh-cn')

const getnewactivitiesInfo = (pageInfo = {
  page: 1,
  pageSize: 10
}) => {
  return axios.post(api.hotActivities, pageInfo)
}

const newActivitiesInfo = {
  state: {
    data: [],
    pageInfo: {
      page: 1,
      pageSize: 10
    }
  },
  mutations: {
    GETNEWACTIVITIESINFO: (state, data) => {
      data.pageInfo && (state.pageInfo = data.pageInfo)
      if (data.pageInfo.page !== 2) { // 说明不是第一次请求了
        state.data = state.data.concat(data.res)
      } else {
        state.data = data.res
      }
    }
  },
  actions: {
    getNewActivitiesInfo ({
      commit,
      state
    }, params) {
      return new Promise((resolve, reject) => {
        getnewactivitiesInfo({
          page: state.pageInfo.page,
          pageSize: state.pageInfo.pageSize
        }).then(res => {
          if (res.data.length > 0) {
            let data = res.data
            for (let i of data) {
              if (moment(new Date()).isBetween(i.activityStartTime, i.activityEndTime)) i.underStatus = 'underWay'
              if (moment(new Date()).isBefore(i.activityStartTime)) i.underStatus = 'notYet'
              if (moment(new Date()).isAfter(i.activityEndTime)) i.underStatus = 'already'
              i.replacedEndTime = i.activityEndTime.substr(0, 10).replace(/-/g, '/')
              i.replacedStartTime = i.activityStartTime.substr(0, 10).replace(/-/g, '/')
            }
            commit('GETNEWACTIVITIESINFO', {
              res: res.data,
              pageInfo: {
                page: state.pageInfo.page + 1,
                pageSize: 10
              }
            })
            resolve(res.data)
          } else {
            reject()
          }
        })
      })
    }
  }
}
export default newActivitiesInfo
