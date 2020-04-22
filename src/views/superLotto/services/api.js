import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/activity-info`)
  /* const data = {"code":200,"data":{"state":2,"beginDate":"2020-04-17 00:00:00","endDate":"2020-04-21 23:59:59","timeline":"2020年4月17日-2020年4月21日","countdown":40880005,"whatDay":6,"userNumCount":0,"numGroup":[],"awardPool":200000,"userNumGroupCount":0,"tipFlog":1},"message":null} */

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
/**
 * @description 新增号码组
 * @return {Object} data
 */
export const addNumGroup = async (params) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/add-num-group`, params)
  return data
}
/**
 * @description 编辑用户号码
 * @return {Object} data
 */
export const modifyNumGroup = async (params) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/modify-num-group`, params)
  return data
}
/**
 * @description 用户信息
 * @return {Object} data
 */
export const myRank = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/my-rank`)
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/rank-list`)
  return data
}
/**
 * @description 任务领取奖励（类型 1=每日任务 2=累充任务）
 * @return {Object} data
 */
export const taskReceive = async (type) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/task-receive/${type}`)
  return data
}
/**
 * @description 用户上期奖励信息
 * @return {Object} data
 */
export const userAwardInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-award-info`)
  /* const data = {
    code: 200,
    data: {
      awardNumGroup: '1234',
      luckyGroupAwardInfo: '2:400',
      maxGroupAwardInfo: '1:300',
      oneGroupAwardInfo: '4:400',
      threeGroupAwardInfo: '6:700',
      twoGroupAwardInfo: '9:1000'
    }
  } */
  return data
}
/**
 * @description 用户上期奖励号码
 * @return {Object} data
 */
export const userAwardNums = async (awardGrade, page) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-award-nums/${awardGrade}/${page}`)
  /* const data = {
    'code': 200,
    'data': [
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      },
      {
        'id': 21,
        'numGroup': [1, 2, 3, 4]
      }
    ],
    'message': 'string'
  } */
  return data
}
/**
 * @description 用户号码组信息
 * @return {Object} data
 */
export const userNumGroups = async (page) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-num-groups/${page}`)
  /* const data = {
    'code': 0,
    'data': [
      {
        'id': 0,
        'numGroup': [1, 2, 3, 4]
      }
    ],
    'message': 'string'
  } */
  return data
}
/**
 * @description 奖励提示
 * @return {Object} data
 */

export const userAwardsTips = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-awards-tips`)
  /* const data = {
    code: 200,
    data: {
      awardNum: 0,
      rankAward: [{
        awardsName: '话费券100',
        awardsType: 'hfq'
      }, {
        awardsName: '金叶子100',
        awardsType: 'jyz'
      }],
      rankIdx: 1,
      rankTips: 1
    }
  } */
  return data
}
/**
 * @description 用户号码信息
 * @return {Object} data
 */
export const userNumInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-num-info`)
  /* const data = {
    'code': 200,
    'data': {
      'eightNum': 20,
      'fiveNum': 10,
      'fourNum': 30,
      'nineNum': 40,
      'numCount': 200,
      'oneNum': 80,
      'sevenNum': 90,
      'sixNum': 10,
      'threeNum': 20,
      'twoNum': 40,
      'zeroNum': 60
    },
    'message': 'string'
  } */
  return data
}
/**
 * @description 用户进度
 * @return {Object} data
 */
export const userProgress = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-progress`)
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
 * @description 礼包
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/240`)
  return data
}
const Service = {
  // 活动信息
  activityInfo,
  // 新增号码组
  addNumGroup,
  // 累消领取奖励
  gameReceive,
  // 编辑用户号码
  modifyNumGroup,
  // 用户信息
  myRank,
  // 排行榜列表
  rankList,
  // 任务领取奖励（类型 1=每日任务 2=累充任务）
  taskReceive,
  // 用户上期奖励信息
  userAwardInfo,
  // 用户上期奖励号码
  userAwardNums,
  // 用户号码组信息
  userNumGroups,
  // 奖励提示
  userAwardsTips,
  // 用户号码信息
  userNumInfo,
  // 用户进度
  userProgress,
  // 礼包
  showLeaguePacksList
}
export default Service
