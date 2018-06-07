import axios from '../../fetch'
import api from '../../api'
import moment from 'moment'
moment.locale('zh-cn')

/* let currentTime = new Date().getTime()
let currentDate = new Date().getDate() */

const getnewServer = (pageInfo) => {
  return axios.post(api.newServer, pageInfo)
}

const newServerInfo = {
  state: {
    pageInfo: {
      page: 0,
      pageSize: 10
    },
    data: []
  },
  mutations: {
    GETNEWSERVER: (state, data) => {
      let currentDate = /* new Date(data.res[0].currentTime).getDate() */ moment(data.res[0].currentTime).date()
      let currentTime = new Date(data.res[0].currentTime).getTime()
      for (let i in data.res) {
        let singleData = data.res[i]
        let overTime, openDate
        overTime =
          /* (new Date(singleData.openTime).getTime() -
            currentTime) /
          1000 /
          60 /
          60 */
          moment(singleData.openTime).from(singleData.currentTime)
        openDate = /* new Date(singleData.openTime).getDate() */ moment(singleData.openTime).date()
        singleData.canGo = false
        if (openDate == currentDate) {
          if (overTime.slice(-1) == '前') {
            if (overTime.slice(-3, -2) == '小') {
              singleData.overTime =
                '已开服<br>' + overTime.slice(0, -4) + '小时'
            } else {
              singleData.overTime =
                '已开服<br>' + 1 + '小时'
            }

            singleData.canGo = true
          } else {
            singleData.overTime =
              '今日'  +
              moment(singleData.openTime).format('HH:mm')+
              '<br>'  +
              '开服'
          }
        } else if (openDate == currentDate + 1) {
          singleData.overTime =
            '明日' +
            moment(singleData.openTime).format('HH:mm') +
            '<br>' +
            '开服'
        } else if (openDate > currentDate + 1) {
          singleData.overTime =
            moment(singleData.openTime).format('MMMDoHH:mm')  +
            '<br>开服'
        } else if (openDate < currentDate) {
          singleData.overTime = '已开服'
          singleData.canGo = true
        }
      }
      data.pageInfo && (state.pageInfo = data.pageInfo)
      if (data.pageInfo.page !== 2) {
        state.data = state.data.concat(data.res)
      } else {
        state.data = data.res
      }
    }
  },
  actions: {
    getNewServer ({
      commit,
      state
    }, params) {
      return new Promise((resolve, reject) => {
        console.log(state.pageInfo.pageSize)
        getnewServer(params || {
          page: state.pageInfo.page + 1,
          pageSize: state.pageInfo.pageSize
        }).then(res => {
          if (res.data.length > 0) {
            commit('GETNEWSERVER', {
              res: res.data,
              pageInfo: {
                page: params.page + 1 || state.singleGame.pageInfo.page + 1,
                pageSize: 10
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
export default newServerInfo
