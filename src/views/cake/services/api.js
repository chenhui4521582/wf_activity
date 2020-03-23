import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const ActivityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/activity-info`)
  // const { data } = {
  //   data: {
  //     'code': 200,
  //     'data': {
  //       'state': 1,
  //       'beginDate': '2020-03-19 00:00:00',
  //       'endDate': '2020-03-23 23:59:59',
  //       'timeline': '2020年3月19日-2020年3月23日',
  //       'countdown': 277450832,
  //       'configList': [
  //         {
  //           'level': 1,
  //           'recharge': 1,
  //           'amount': 1588,
  //           'status': 1
  //         },
  //         {
  //           'level': 2,
  //           'recharge': 10,
  //           'amount': 2288,
  //           'status': 0
  //         },
  //         {
  //           'level': 3,
  //           'recharge': 88,
  //           'amount': 3000,
  //           'status': 0
  //         }
  //       ],
  //       'todayRecharge': 100,
  //       'totalRecharge': 100,
  //       'todayApplyNum': 2,
  //       'applyPopup': true,
  //       'forgetPopup': false,
  //       'divideDateStr': '20200320'
  //     },
  //     'message': null
  //   }
  // }
  return data
}
/**
 * @description 瓜分
 * @return {Object} data
 */
export const Divide = async (time) => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/divide/${time}`)
  const { data } = {
    data: {
      code: 200,
      data: {
        applyDate: '2020-03-21',
        divideList: [
          {
            awardsName: '2元话费券',
            level: 2,
            status: 1
          },
          {
            awardsName: '1元话费券',
            level: 1,
            status: 1
          }
          // {
          //   awardsName: '3元话费券',
          //   level: 3,
          //   status: 2
          // }
        ],
        markupNum: 1123
      }
    }
  }
  return data
}
/**
 * @description 瓜分榜单
 * @return {Object} data
 */
export const RankList = async (params) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/rank-list`, params)
  return data
}
/**
 * @description 使用加成卡
 * @return {Object} data
 */
export const UseMarkup = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/use-markup`)
  // const { data } = {
  //   data: {
  //     code: 200,
  //     data:
  //     {
  //       awardsName: '3元话费券',
  //       level: 3,
  //       status: 2
  //     }
  //   }
  // }
  return data
}
/**
 * @description 用户记录
 * @return {Object} data
 */
export const UserRecord = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/user-record`)
  return data
}
// /**
//  * @description 查询瓜分类活动状态
//  * @return {Object} data
//  */
// export const DivideState = async () => {
//   const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/activity/divide-state`)
//   return data
// }
/**
 * @description 礼包接口地址
 * @return {Object} data
 */
export const GetMallProductList = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/237
  `)
  return data
}
