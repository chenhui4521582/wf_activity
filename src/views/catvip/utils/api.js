import $axios from '../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/activityInfo')
  // const data = {
  //   'code': 200,
  //   'data': {
  //     'batchId': '20200303',
  //     'state': 1,
  //     'beginDate': '2020-03-11',
  //     'endDate': '2020-04-09',
  //     'catLevel': 19,
  //     'juniorLotteryNum': 3,
  //     'seniorLotteryNum': 1,
  //     'catStatus': true,
  //     'juniorLottery': 0,
  //     'seniorLottery': 0,
  //     'rechargeAmount': 0,
  //     'lastRechargeAmount': 0,
  //     'countdown': 542456581,
  //     'hfqNum': 3112,
  //     'awardsConfigList': [
  //       {
  //         'level': 1,
  //         'awardsList': [
  //           {
  //             'weight': 0.1,
  //             'awardsType': 32,
  //             'awardsNum': 1,
  //             'awardsName': '100减100优惠券',
  //             'awardsImage': '/group1/M00/42/3D/CmcEHF5nMpKAWbM3AABWPETYxsc299.png',
  //             'phyAwardsId': 330,
  //             'showName': '100-100',
  //             'sort': 1,
  //             'star': 0,
  //             'value': 0.10000000149011612
  //           },
  //           {
  //             'weight': 1,
  //             'awardsType': 32,
  //             'awardsNum': 1,
  //             'awardsName': '50减25优惠券',
  //             'awardsImage': '/group1/M00/42/3D/CmcEHF5nMqWAd3FdAABXYfvv7SE776.png',
  //             'phyAwardsId': 331,
  //             'showName': '50-25',
  //             'sort': 2,
  //             'star': 0,
  //             'value': 1
  //           },
  //           {
  //             'weight': 15,
  //             'awardsType': 32,
  //             'awardsNum': 1,
  //             'awardsName': '5减1优惠券',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nNAWAHutoAABXYfvv7SE300.png',
  //             'phyAwardsId': 332,
  //             'showName': '5-1',
  //             'sort': 3,
  //             'star': 1,
  //             'value': 15
  //           },
  //           {
  //             'weight': 1,
  //             'awardsType': 10,
  //             'awardsNum': 30,
  //             'awardsName': '3元话费券',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nM4GAPf4cAAC1fDmxGW8744.png',
  //             'phyAwardsId': 7,
  //             'showName': '5元',
  //             'sort': 4,
  //             'star': 0,
  //             'value': 1
  //           },
  //           {
  //             'weight': 27,
  //             'awardsType': 10,
  //             'awardsNum': 5,
  //             'awardsName': '0.5元话费券',
  //             'awardsImage': '/group1/M00/43/19/CmcEHV5nM2mAWNAuAAC1fDmxGW8737.png',
  //             'phyAwardsId': 7,
  //             'showName': '0.5元',
  //             'sort': 5,
  //             'star': 1,
  //             'value': 27
  //           },
  //           {
  //             'weight': 20.9,
  //             'awardsType': 1,
  //             'awardsNum': 688,
  //             'awardsName': '688金叶子',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nM7OABoRQAABS-oh8cf0893.png',
  //             'phyAwardsId': 1,
  //             'showName': '688',
  //             'sort': 6,
  //             'star': 1,
  //             'value': 20.899999618530273
  //           },
  //           {
  //             'weight': 35,
  //             'awardsType': 1,
  //             'awardsNum': 188,
  //             'awardsName': '188金叶子',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nM-CABUL1AABS-oh8cf0295.png',
  //             'phyAwardsId': 1,
  //             'showName': '188',
  //             'sort': 7,
  //             'star': 1,
  //             'value': 35
  //           }
  //         ]
  //       },
  //       {
  //         'level': 10,
  //         'awardsList': [
  //           {
  //             'weight': 0.2,
  //             'awardsType': 32,
  //             'awardsNum': 1,
  //             'awardsName': '500减500优惠券',
  //             'awardsImage': '/group1/M00/42/3D/CmcEHF5nMpKAWbM3AABWPETYxsc299.png',
  //             'phyAwardsId': 330,
  //             'showName': '500-500',
  //             'sort': 1,
  //             'star': 0,
  //             'value': 0.20000000298023224
  //           },
  //           {
  //             'weight': 2,
  //             'awardsType': 32,
  //             'awardsNum': 1,
  //             'awardsName': '100减60优惠券',
  //             'awardsImage': '/group1/M00/42/3D/CmcEHF5nMqWAd3FdAABXYfvv7SE776.png',
  //             'phyAwardsId': 331,
  //             'showName': '100-60',
  //             'sort': 2,
  //             'star': 0,
  //             'value': 2
  //           },
  //           {
  //             'weight': 15,
  //             'awardsType': 32,
  //             'awardsNum': 1,
  //             'awardsName': '50减10优惠券',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nNAWAHutoAABXYfvv7SE300.png',
  //             'phyAwardsId': 332,
  //             'showName': '50-10',
  //             'sort': 3,
  //             'star': 1,
  //             'value': 15
  //           },
  //           {
  //             'weight': 1,
  //             'awardsType': 10,
  //             'awardsNum': 400,
  //             'awardsName': '40元话费券',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nM4GAPf4cAAC1fDmxGW8744.png',
  //             'phyAwardsId': 7,
  //             'showName': '40元',
  //             'sort': 4,
  //             'star': 0,
  //             'value': 1
  //           },
  //           {
  //             'weight': 30,
  //             'awardsType': 10,
  //             'awardsNum': 60,
  //             'awardsName': '6元话费券',
  //             'awardsImage': '/group1/M00/43/19/CmcEHV5nM2mAWNAuAAC1fDmxGW8737.png',
  //             'phyAwardsId': 7,
  //             'showName': '6元',
  //             'sort': 5,
  //             'star': 1,
  //             'value': 30
  //           },
  //           {
  //             'weight': 30,
  //             'awardsType': 1,
  //             'awardsNum': 688,
  //             'awardsName': '6888金叶子',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nM7OABoRQAABS-oh8cf0893.png',
  //             'phyAwardsId': 1,
  //             'showName': '688',
  //             'sort': 6,
  //             'star': 1,
  //             'value': 30
  //           },
  //           {
  //             'weight': 21.8,
  //             'awardsType': 1,
  //             'awardsNum': 188,
  //             'awardsName': '2888金叶子',
  //             'awardsImage': '/group1/M00/43/1A/CmcEHV5nM-CABUL1AABS-oh8cf0295.png',
  //             'phyAwardsId': 1,
  //             'showName': '188',
  //             'sort': 7,
  //             'star': 1,
  //             'value': 21.799999237060547
  //           }
  //         ]
  //       }
  //     ],
  //     'leafConvertConfig': {
  //       'level': 40,
  //       'limit': 30,
  //       'purchased': 0,
  //       'leafs': 20000,
  //       'leafName': '2万金叶子',
  //       'hfq': 250,
  //       'hfqName': '25元话费券',
  //       'type': 'jyz',
  //       'convert': true
  //     },
  //     'taskConfigList': [
  //       {
  //         'taskName': '喂养一次招财猫',
  //         'taskId': 1,
  //         'awardsName': '鱼干加成+5%（1天）',
  //         'image': '/group1/M00/43/19/CmcEHV5l2eiAMCUaAACHg7Ot3OY135.png',
  //         'status': 0,
  //         'url': '/petcat'
  //       },
  //       {
  //         'taskName': '猫商城购买一次道具',
  //         'taskId': 2,
  //         'awardsName': '2猫币',
  //         'image': '/group1/M00/0C/22/CmcEHVu9a4CAXpBoAAAeJwt7x-0848.png',
  //         'status': 0,
  //         'url': '/shop'
  //       },
  //       {
  //         'taskName': '今日获得50g鱼干',
  //         'taskId': 3,
  //         'awardsName': '0.5猫币',
  //         'image': '/group1/M00/0C/23/CmcEHVu9c6aAalG_AAAiU--VNUY849.png',
  //         'status': 0,
  //         'url': '/moreGamePop'
  //       }
  //     ],
  //     'popup': false
  //   },
  //   'message': null
  // }

  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */

export const rankList = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/rankList')
  return data
}
/**
 * @description 元宵红包活动-累消领取奖励
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/game-receive/' + sort)
  return data
}
/**
 * @description 元宵红包活动-副页活动详细信息
 * @return {Object} data
 */
export const taskProgressInfo = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/activity-detail-info')
  return data
}
/**
 * @description 元宵红包活动-任务领取奖励 任务序号,1:每日任务数，2：充值数
 * @return {Object} data
 */
export const taskReceive = async (params) => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/task-receive/' + params.sort)
  return data
}
/**
 * @description 领取记录
 * @return {Object} data
 */

export const gameReceiveRecord = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/user-coupon-awards')
  return data
}

/**
 * @description 奖励提示
 * @return {Object} data
 */

export const userAwardsTips = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/user-awards-tips')
  return data
}

/**
 * @description 瓜分券奖励领取
 * @return {Object} data
 */

export const couponAwardReceive = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/coupon-award-receive')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/notice-list')
  return data
}

/**
 * @description 兑换叶子
 * @return {Object} data
 */

export const exchangeLeaf = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/leafConvert')
  return data
}
/**
 * @description 任务领取
 * @return {Object} data
 */
export const taskGain = async (id) => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/task/' + id)
  return data
}
/**
 * @description 付费抽奖
 * @return {Object} data
 */
export const levelLottery = async (params) => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/lottery', params)
  return data
}

/**
 * @description 礼包数据
 * @return {Object} data
 */
export const getPackages = async (flag) => {
  const { data } = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/' + flag)
  // const data = {
  //   'code': 200,
  //   'data': {
  //     'mallBizConfigs': [
  //       {
  //         'bizId': 100129,
  //         'name': '招财猫会员日1元抽奖券',
  //         'price': 1,
  //         'amount': 0,
  //         'giveAmount': null,
  //         'content': '招财猫会员日抽奖券',
  //         'icon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'productIcon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'thirdId': '',
  //         'startTime': '2020-04-03 07:35:33',
  //         'endTime': '2020-04-11 17:35:33',
  //         'limitTimes': 999999,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [],
  //         'bizType': 235,
  //         'bizTarget': 100129,
  //         'cash': null,
  //         'code': 20200310,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 10051,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': ''
  //       },
  //       {
  //         'bizId': 100164,
  //         'name': '8元直升礼包',
  //         'price': 8,
  //         'amount': 0,
  //         'giveAmount': null,
  //         'content': '招财猫直升Lv.20',
  //         'icon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'productIcon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'thirdId': '',
  //         'startTime': '2020-04-03 14:05:58',
  //         'endTime': '2020-04-11 00:00:00',
  //         'limitTimes': 999999,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [],
  //         'bizType': 235,
  //         'bizTarget': 100164,
  //         'cash': null,
  //         'code': 20200312,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 10063,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': ''
  //       },
  //       {
  //         'bizId': 100165,
  //         'name': '招财猫会员日10元抽奖券',
  //         'price': 10,
  //         'amount': 0,
  //         'giveAmount': null,
  //         'content': '招财猫会员日抽奖券',
  //         'icon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'productIcon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'thirdId': '',
  //         'startTime': '2020-04-03 14:04:49',
  //         'endTime': '2020-04-11 00:00:00',
  //         'limitTimes': 999999,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [],
  //         'bizType': 235,
  //         'bizTarget': 100165,
  //         'cash': null,
  //         'code': 20200311,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 10062,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': ''
  //       },
  //       {
  //         'bizId': 100166,
  //         'name': '18元直升礼包',
  //         'price': 18,
  //         'amount': 0,
  //         'giveAmount': null,
  //         'content': '招财猫直升Lv.20 +18000金叶子',
  //         'icon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'productIcon': '/group1/M00/42/3C/CmcEHF5mDieAWNHKAACHg7Ot3OY474.png',
  //         'thirdId': '',
  //         'startTime': '2020-04-03 14:06:26',
  //         'endTime': '2020-04-10 23:59:59',
  //         'limitTimes': 999999,
  //         'dailyPool': 999999,
  //         'remark': '',
  //         'buyFlag': 1,
  //         'buyStatus': 0,
  //         'totalNum': 999999,
  //         'awardsList': [
  //           {
  //             'awardsName': '金叶子',
  //             'awardsImage': '',
  //             'awardsNum': 18000,
  //             'awardsType': 1,
  //             'phyAwardsId': 1,
  //             'remark': '',
  //             'params': null
  //           }
  //         ],
  //         'bizType': 235,
  //         'bizTarget': 100166,
  //         'cash': null,
  //         'code': 20200318,
  //         'backgroundImage': null,
  //         'buttonImage': null,
  //         'colorValue': null,
  //         'productId': 10064,
  //         'isDiscount': false,
  //         'position': 1,
  //         'cornerDesc': ''
  //       }
  //     ]
  //   },
  //   'message': null
  // }
  return data
}
