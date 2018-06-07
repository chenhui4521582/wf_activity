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
      page: 0,
      pageSize: 10
    }
  },
  mutations: {
    GETNEWACTIVITIESINFO: (state, data) => {
      data.pageInfo && (state.pageInfo = data.pageInfo)
      if (data.pageInfo.page !== 2) {
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
        getnewactivitiesInfo(params || {
          page: state.pageInfo.page + 1,
          pageSize: state.pageInfo.pageSize
        }).then(res => {
          if (res.data.length > 0) {
            let data = res.data
            for (let i of data) {
              if (moment(new Date()).isBetween(i.activityStartTime, i.activityEndTime)) i.underStatus = 'underWay'
              if (moment(new Date()).isBefore(i.activityStartTime)) i.underStatus = 'notYet'
              if (moment(new Date()).isAfter(i.activityEndTime)) i.underStatus = 'already'
              i.showEndTime = i.activityEndTime.substr(0, 10).replace(/-/g, '/')
              i.showStartTime = i.activityStartTime.substr(0, 10).replace(/-/g, '/')
            }
            commit('GETNEWACTIVITIESINFO', {
              res: res.data,
              pageInfo: {
                page: params.page + 1 || state.singleGame.pageInfo.page + 1,
                pageSize: params.pageSize + 1 || state.singleGame.pageInfo.pageSize
              }
            })
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }
}
export default newActivitiesInfo
