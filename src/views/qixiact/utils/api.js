import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/activity-info')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/notice-list')
  return data
}
/**
 * @description 礼包数据
 * @return {Object} data
 */
export const showLeaguePacksList = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/248')
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const getRankList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/rank-list')
  return data
}
/**
 * @description 昨日榜单
 * @return {Object} data
 */
export const getHistoryRankList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/history-rank')
  return data
}
/**
 * @description 奖励记录
 * @return {Object} data
 */
export const getAwardsRecord = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/user-awards-list')
  return data
}
/**
 * @description 抽奖
 * @return {Object} data
 */
export const drawLot = async (amount) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/draw/' + amount)
  return data
}

/**
 * @description 用户进度
 * @return {Object} data
 */
export const userProgress = async () => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/slam-jackpot/user-betting-progress`)
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
export const gameReceive = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/receive/betting')
  return data
}
/**
 * @description 领取优惠券
 * @return {Object} data
 */
export const receiveCoupon = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/receive/coupon')
  return data
}
/**
 * @description 奖池当前额度
 * @return {Object} data
 */
export const getJackpotAmount = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/jackpot-amount')
  return data
}
/**
 * @description 获取道具列表
 * @return {Object} data
 */
export const getPopupList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/slam-jackpot/receive-popup-list')
  return data
}
