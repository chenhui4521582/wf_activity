import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/activity-info')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/notice-list')
  return data
}
/**
 * @description 礼包数据
 * @return {Object} data
 */
export const showLeaguePacksList = async (id) => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/253/' + id)
  return data
}
/**
 * @description 个人榜列表
 * @return {Object} data
 */
export const getRankListPersonal = async (isToday) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/qixi/personal-rank/${isToday ? 'today' : 'yesterday'}`)
  return data
}
/**
 * @description 往期团队榜
 * @return {Object} data
 */
export const getHistoryRankList = async (params) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/team-rank/history', params)
  return data
}
/**
 * @description 奖励记录
 * @return {Object} data
 */
export const getAwardsRecord = async (isTeam) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/qixi/${isTeam ? 'team-rank' : 'personal-rank'}/my-awards`)
  return data
}
/**
 * @description 领奖
 * @return {Object} data
 */
export const gainAwardsRecord = async (isTeam, id) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/qixi/${isTeam ? 'team-rank' : 'personal-rank'}/receive-awards/` + id)
  return data
}
/**
 * @description 入队
 * @return {Object} data
 */
export const applyTeam = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/apply')
  return data
}
/**
 * @description 活动动态数值
 * @return {Object} data
 */
export const getDynamic = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/activity-dynamic')
  return data
}
/**
 * @description 当前团队榜
 * @return {Object} data
 */
export const getCurrentTeamRank = async (team) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/team-rank/current/' + team)
  return data
}
/**
 * @description 用户进度
 * @return {Object} data
 */
export const userProgress = async () => {
  const { data } = await $axios.post(`//ops-api.beeplaying.com/ops/api/lotto/user-progress`)
  /* const data = {
    'code': 200,
    'data': {
      'taskProgress': [
        {
          'state': 0,
          'totalNum': 20,
          'finishNum': 0,
          'idx': 1
        },
        {
          'state': 0,
          'totalNum': 10,
          'finishNum': 0,
          'idx': 2
        }
      ],
      'gameProgress': {
        'gameBetting': 0,
        'gameBettingNumCount': 0,
        'progressList': [
          {
            'sort': 1,
            'amount': 200000,
            'propType': 1,
            'awards': 3,
            'status': 1
          },
          {
            'sort': 2,
            'amount': 500000,
            'propType': 1,
            'awards': 6,
            'status': 0
          },
          {
            'sort': 3,
            'amount': 1000000,
            'propType': 1,
            'awards': 9,
            'status': 0
          },
          {
            'sort': 4,
            'amount': 2000000,
            'propType': 1,
            'awards': 18,
            'status': 0
          },
          {
            'sort': 5,
            'amount': 3000000,
            'propType': 1,
            'awards': 30,
            'status': 0
          },
          {
            'sort': 6,
            'amount': 5000000,
            'propType': 1,
            'awards': 60,
            'status': 0
          },
          {
            'sort': 7,
            'amount': 10000000,
            'propType': 1,
            'awards': 150,
            'status': 0
          },
          {
            'sort': 8,
            'amount': 30000000,
            'propType': 1,
            'awards': 480,
            'status': 0
          },
          {
            'sort': 9,
            'amount': 50000000,
            'propType': 1,
            'awards': 840,
            'status': 0
          },
          {
            'sort': 10,
            'amount': 100000000,
            'propType': 1,
            'awards': 1800,
            'status': 0
          },
          {
            'sort': 11,
            'amount': 200000000,
            'propType': 1,
            'awards': 3840,
            'status': 0
          },
          {
            'sort': 12,
            'amount': 300000000,
            'propType': 1,
            'awards': 6000,
            'status': 0
          },
          {
            'sort': 13,
            'amount': 500000000,
            'propType': 1,
            'awards': 10500,
            'status': 0
          },
          {
            'sort': 14,
            'amount': 1000000000,
            'propType': 1,
            'awards': 24000,
            'status': 0
          }
        ]
      },
      'buyTime': 0,
      'buyNumCount': 0
    },
    'message': null
  } */
  return data
}
/**
 * @description 累消领取奖励
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/game-receive/${sort}`)
  /* const data = {
    'code': 200,
    'data': {
      'eightNum': 1,
      'fiveNum': 0,
      'fourNum': 0,
      'nineNum': 0,
      'numCount': 0,
      'oneNum': 0,
      'sevenNum': 0,
      'sixNum': 0,
      'threeNum': 0,
      'twoNum': 0,
      'zeroNum': 0
    },
    'message': 'string'
  } */
  return data
}
