const getters = {
  newsListInfo: state => state.newsListInfo.list.data, // 资讯列表默认展示内容，10条
  newsListGameGroup: state => state.newsListInfo.gameGroup.data, // 资讯列表上面的游戏分类
  singleGameList: state => {
    /* let data = []
    for (let i = 0; i < 10; i++) {
      data = data.concat(state.newsListInfo.singleGame.data)
    }
    return data */
    return state.newsListInfo.singleGame.data
  }, // 单独一项游戏列表
  singleGameName: state => state.newsListInfo.singleGame.gameName, // 单独游戏资讯列表游戏名
  newServerList: state => state.newServerInfo.data, // 新开服列表
  newHotActivitiesInfo: state => state.newActivitiesInfo.data, // 热门活动
  articleDetails: state => state.articleDetailsInfo.data, // 单个文章内容
  fromWhichList: state => state.articleDetailsInfo.fromWhichList, // 点击详情内的返回列表时判断返回哪个列表
  bannerList: state => state.bannerInfo.data, // 轮播图列表
  activityInfo: state => state.articleDetailsInfo.activityData, // 活动内容
  userAmount: state => state.userInfo.amount, // 用户金叶子数
  userId: state => state.userInfo.userId, // 用户ID
  userInfo: state => state.userInfo
}
export default getters
