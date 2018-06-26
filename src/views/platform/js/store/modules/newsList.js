import axios from '../../fetch'
import api from '../../api'
import moment from 'moment'

moment.locale('zh-cn')
const getnewsList = () => {
  return axios.post(api.newsList)
}

const getgroupList = (gameType, pageInfo) => {
  return axios.post(api.gameGroupList, {
    page: pageInfo.page,
    pageSize: pageInfo.pageSize,
    gameType
  })
}

const checkTime = (data) => {
  /* let currentTime = new Date(data.news[0].currentTime || data[0].currentTime).getTime()
  let currentDate = new Date(data.news[0].currentTime || data[0].currentTime).getDate() */
  if (data.news) {
    for (let i of data.news) {
      if (moment(i.currentTime).diff(i.updateTime, 'hours') > 24) {
        i.editTime = moment(i.updateTime).format('MM-DD')
      } else {
        // if(moment(i.updateTime).from(i.currentTime)){
        i.editTime = moment(i.updateTime).from(i.currentTime)
        // }
      }
    }
  } else {
    for (let i of data) {
      if (moment(i.currentTime).diff(i.updateTime, 'hours') > 24) {
        i.editTime = moment(i.updateTime).format('MM-DD')
      } else {
        // if(moment(i.updateTime).from(i.currentTime)){
        i.editTime = moment(i.updateTime).from(i.currentTime)
        // }
      }
    }
  }
}

const newsListInfo = {
  state: {
    list: {
      data: []
    },
    gameGroup: {
      data: []
    },
    single: {
      data: null
    },
    singleGame: {
      gameType: 0,
      pageInfo: {
        page: 1,
        pageSize: 10
      },
      data: [],
      gameName: ''
    }
  },
  mutations: {
    // 第三个tab
    GETNEWSLIST: (state, data) => {
      state.list.data = data.news
      state.gameGroup.data = data.games
    },
    // 分类详情
    GETGROUPLIST: (state, data) => {
      state.singleGame.pageInfo = data.pageInfo
      state.singleGame.gameType = data.gameType
      state.singleGame.gameName = data.gameName
      if (data.pageInfo.page !== 2) {
        state.singleGame.data = state.singleGame.data.concat(data.res)
      } else {
        state.singleGame.data = data.res
      }
    }
  },
  actions: {
    // 第三个tab
    GetNewsList ({
      commit
    }) {
      getnewsList().then(res => {
        checkTime(res.data)
        commit('GETNEWSLIST', res.data)
      })
    },
    // 分类详情
    GetGroupList ({
      commit,
      state
    }, params) {
      return new Promise((resolve, reject) => {
        let curPage = {
          page: 1,
          pageSize: 10
        }
        if (params.gameType == state.singleGame.gameType) {
          curPage = {
            page: state.singleGame.pageInfo.page,
            pageSize: state.singleGame.pageInfo.pageSize
          }
        }
        getgroupList(params.gameType, curPage).then(res => {
          /* if (params.gameType != state.singleGame.gameType) {
            // if (res.data.length > 0) {
            if (res.data.length > 0) checkTime(res.data)
            commit('GETGROUPLIST', {
              gameType: params.gameType,
              res: res.data,
              pageInfo: {
                page: state.singleGame.pageInfo.page + 1,
                pageSize: 10
              },
              firstClick: params.firstClick,
              gameName: res.data.length ? res.data[0].gameName : params.gameName
            })
            resolve(res.data)
            // } else {
            //   reject()
            // }
          } else { */
          if (res.data.length > 0) {
            checkTime(res.data)
            commit('GETGROUPLIST', {
              gameType: params.gameType,
              res: res.data,
              pageInfo: {
                page: curPage.page + 1,
                pageSize: 10
              },
              firstClick: params.firstClick,
              gameName: res.data[0].gameName
            })
            resolve(res.data)
          } else {
            commit('GETGROUPLIST', {
              gameType: params.gameType,
              res: res.data,
              pageInfo: {
                page: curPage.page + 1,
                pageSize: 10
              },
              firstClick: params.firstClick,
              gameName: params.gameName
            })
            reject()
          }
          // }
        })
      })
    }
  }
}
export default newsListInfo
