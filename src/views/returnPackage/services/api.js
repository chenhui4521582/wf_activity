import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityHome = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/activityHome`)
  // const data = {
  //   'code': 200,
  //   'data': {
  //     'state': 1,
  //     'endDate': '07月26日 23:59:59',
  //     'userPoints': 1000,
  //     'signInVo': [
  //       {
  //         'day': 1,
  //         'date': null,
  //         'status': 3,
  //         'awardName': '100金叶子',
  //         'curDay': false
  //       },
  //       {
  //         'day': 2,
  //         'date': null,
  //         'status': 3,
  //         'awardName': '1000金叶子',
  //         'curDay': false
  //       },
  //       {
  //         'day': 3,
  //         'date': null,
  //         'status': 1,
  //         'awardName': '100金叶子',
  //         'curDay': true
  //       },
  //       {
  //         'day': 4,
  //         'date': null,
  //         'status': 0,
  //         'awardName': '1000金叶子',
  //         'curDay': false
  //       },
  //       {
  //         'day': 5,
  //         'date': null,
  //         'status': 0,
  //         'awardName': '1000金叶子',
  //         'curDay': false
  //       }
  //     ],
  //     'pointVo': [
  //       {
  //         'id': 1,
  //         'points': 10,
  //         'status': 1,
  //         'awardImg': '/group1/M00/42/66/CmcEHF6pUOGAaMaCAAALg0Zwq8c064.png'
  //       },
  //       {
  //         'id': 2,
  //         'points': 30,
  //         'status': 1,
  //         'awardImg': '/group1/M00/42/66/CmcEHF6pUOGAaMaCAAALg0Zwq8c064.png'
  //       },
  //       {
  //         'id': 3,
  //         'points': 50,
  //         'status': 1,
  //         'awardImg': '/group1/M00/42/66/CmcEHF6pUOGAaMaCAAALg0Zwq8c064.png'
  //       }
  //     ],
  //     'taskVo': [
  //       {
  //         'taskId': 4,
  //         'taskName': '今日累计支持5W金叶志',
  //         'taskProgress': 0,
  //         'userTaskProgress': null,
  //         'taskStatus': 1,
  //         'awardName': '大户召回积分',
  //         'awardImg': '',
  //         'sort': 1
  //       },
  //       {
  //         'taskId': 5,
  //         'taskName': '今日累计支持10W金叶志',
  //         'taskProgress': 0,
  //         'userTaskProgress': null,
  //         'taskStatus': 1,
  //         'awardName': '大户召回积分',
  //         'awardImg': '',
  //         'sort': 1
  //       },
  //       {
  //         'taskId': 6,
  //         'taskName': '今日累计支持20W金叶志',
  //         'taskProgress': 0,
  //         'userTaskProgress': null,
  //         'taskStatus': 1,
  //         'awardName': '大户召回积分',
  //         'awardImg': '',
  //         'sort': 1
  //       }
  //     ]
  //   },
  //   'message': null
  // }
  return data
}
/**
 * @description 首页接口
 * @return {Object} data
 */
export const inlet = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/inlet`)
  return data
}
/**
 * @description 积分领取
 * @return {Object} data
 */
export const pointConvert = async (id) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/pointConvert/${id}`)
  return data
}
/**
 * @description 签到
 * @return {Object} data
 */
export const sign = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/sign`)
  const data = {
    'code': 200,
    'data': {
      'signInRsps': [
        {
          'day': 1,
          'date': null,
          'status': 3,
          'awardName': '100金叶子',
          'curDay': false
        },
        {
          'day': 2,
          'date': null,
          'status': 3,
          'awardName': '1000金叶子',
          'curDay': false
        },
        {
          'day': 3,
          'date': null,
          'status': 2,
          'awardName': '100金叶子',
          'curDay': true
        },
        {
          'day': 4,
          'date': null,
          'status': 0,
          'awardName': '1000金叶子',
          'curDay': false
        },
        {
          'day': 5,
          'date': null,
          'status': 0,
          'awardName': '1000金叶子',
          'curDay': false
        }
      ],
      'awardRsp': {
        'awardName': '100金叶子',
        'awardNum': 100,
        'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png'
      }
    },
    'message': null
  }
  return data
}
/**
 * @description 任务领取
 * @return {Object} data
 */
export const taskFinish = async (taskId) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/taskFinish/${taskId}`)
  return data
}
/**
 * @description 礼包
 * @return {Object} data
 */
export const bigCustomerRecallProducts = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/bigCustomer/bigCustomerRecallProducts`)
  // const data = {
  //   'code': 200,
  //   'data': {
  //     'list': [
  //       {
  //         'bizId': 5201,
  //         'name': '600元超值礼包',
  //         'price': 600,
  //         'amount': 600000,
  //         'giveAmount': null,
  //         'content': '额外加赠600000金叶',
  //         'icon': '/group1/M00/3D/CB/CmcEHF064kCAbOTnAAElMjdJJFQ428.png',
  //         'productIcon': '/group1/M00/42/8A/CmcEHF8aoruAc0X5AAA3pMYNizA177.png',
  //         'thirdId': '',
  //         'startTime': '2019-07-1114: 25: 24',
  //         'endTime': '2029-07-1814: 25: 24',
  //         'limitTimes': 1,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [
  //           {
  //             'awardsName': '金叶子',
  //             'awardsImage': '',
  //             'awardsNum': 600000,
  //             'awardsType': 1,
  //             'phyAwardsId': 1,
  //             'remark': '',
  //             'params': null
  //           }
  //         ],
  //         'bizType': 220,
  //         'bizTarget': 5201,
  //         'cash': null,
  //         'code': 2019071101,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 806,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': '',
  //         'discount': 5.0
  //       },
  //       {
  //         'bizId': 5202,
  //         'name': '350元超值礼包',
  //         'price': 350,
  //         'amount': 350000,
  //         'giveAmount': null,
  //         'content': '额外加赠150000金叶',
  //         'icon': '/group1/M00/3D/CB/CmcEHF064lGAG2wfAACWHB7nWX0238.png',
  //         'productIcon': '/group1/M00/43/6D/CmcEHV8awHeAMtuMAACJHHG55TU315.png',
  //         'thirdId': '',
  //         'startTime': '2019-07-1114: 49: 00',
  //         'endTime': '2024-07-1823: 59: 59',
  //         'limitTimes': 1,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [
  //           {
  //             'awardsName': '金叶子',
  //             'awardsImage': '',
  //             'awardsNum': 150000,
  //             'awardsType': 1,
  //             'phyAwardsId': 1,
  //             'remark': '',
  //             'params': null
  //           }
  //         ],
  //         'bizType': 220,
  //         'bizTarget': 5202,
  //         'cash': null,
  //         'code': 2019071101,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 807,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': '',
  //         'discount': 7.0
  //       },
  //       {
  //         'bizId': 5203,
  //         'name': '168元超值礼包',
  //         'price': 168,
  //         'amount': 168000,
  //         'giveAmount': null,
  //         'content': '额外加赠42000金叶',
  //         'icon': '/group1/M00/3D/CB/CmcEHF064l2APjDpAACc525Mj_4991.png',
  //         'productIcon': '/group1/M00/42/8A/CmcEHF8aoqSAWIwYAAAseGcU05c684.png',
  //         'thirdId': '',
  //         'startTime': '2019-07-1114: 50: 43',
  //         'endTime': '2024-07-1823: 59: 59',
  //         'limitTimes': 1,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [
  //           {
  //             'awardsName': '金叶子',
  //             'awardsImage': '',
  //             'awardsNum': 42000,
  //             'awardsType': 1,
  //             'phyAwardsId': 1,
  //             'remark': '',
  //             'params': null
  //           }
  //         ],
  //         'bizType': 220,
  //         'bizTarget': 5203,
  //         'cash': null,
  //         'code': 2019071101,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 808,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': '',
  //         'discount': 8.0
  //       },
  //       {
  //         'bizId': 5204,
  //         'name': '88元超值礼包',
  //         'price': 88,
  //         'amount': 88000,
  //         'giveAmount': null,
  //         'content': '额外加赠22000金叶',
  //         'icon': '/group1/M00/3D/CB/CmcEHF064meANC1lAACQfykxKsc133.png',
  //         'productIcon': '/group1/M00/42/8A/CmcEHF8aopaAbYSwAAAr3td1KAo482.png',
  //         'thirdId': '',
  //         'startTime': '2020-07-2414: 51: 58',
  //         'endTime': '2024-07-1900: 00: 00',
  //         'limitTimes': 1,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [
  //           {
  //             'awardsName': '金叶子',
  //             'awardsImage': '',
  //             'awardsNum': 22000,
  //             'awardsType': 1,
  //             'phyAwardsId': 1,
  //             'remark': '',
  //             'params': null
  //           }
  //         ],
  //         'bizType': 220,
  //         'bizTarget': 5204,
  //         'cash': null,
  //         'code': 2019071101,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 809,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': '',
  //         'discount': 8.0
  //       }
  //     ],
  //     'haveBuy': false,
  //     'dateRange': null,
  //     'extraAmount': null
  //   },
  //   'message': null
  // }
  return data
}
/**
 * @description 发送大户召回附赠金叶子
 * @return {Object} data
 */
export const sendBigCustomerAdditionalRewards = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/bigCustomer/sendBigCustomerAdditionalRewards`)
  return data
}

const Service = {
  activityHome,
  inlet,
  pointConvert,
  sign,
  taskFinish,
  bigCustomerRecallProducts,
  sendBigCustomerAdditionalRewards
}
export default Service
