import Vue from 'vue'
import Vuex from 'vuex'
import newsListInfo from './modules/newsList'
import newServerInfo from './modules/newServer'
import newActivitiesInfo from './modules/hotActivities'
import articleDetailsInfo from './modules/articleDetails'
import bannerInfo from './modules/bannerInfo'
import userInfo from './modules/userInfo'
import getters from './getter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    newsListInfo,
    newServerInfo,
    newActivitiesInfo,
    articleDetailsInfo,
    bannerInfo,
    userInfo
  },
  getters
})

export default store
