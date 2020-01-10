import $axios from '../../../http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/activity-info`)
  const data = {
    'code': 200,
    'data': {
      'state': 1,
      'beginDate': '2020-01-02 00:00:00',
      'endDate': '2020-01-14 23:59:59',
      'timeline': '2020.1.2-1.14',
      'countdown': 355439449,
      'maxBlessing': 10000,
      'myBlessing': 312,
      'incrBlessing': 0,
      'rebateAmount': 123,
      'bettingAmount': 123400,
      'minBetting': 1000,
      'unReceiveNum': 16
    },
    'message': null
  }
  return data
}
/**
 * @description 获取记录
 * @return {Object} data
 */
export const findRecord = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/find-record`)
  const data = {
    'code': 200,
    'data': {
      'totalBlessing': 312,
      'todayBlessing': 0,
      'blessingList': [
        {
          'blessing': 20,
          'createTime': '2020/01/10 14:43:59'
        },
        {
          'blessing': 19,
          'createTime': '2020/01/10 14:43:59'
        },
        {
          'blessing': 18,
          'createTime': '2020/01/10 14:43:59'
        },
        {
          'blessing': 17,
          'createTime': '2020/01/10 14:43:59'
        },
        {
          'blessing': 16,
          'createTime': '2020/01/10 14:43:59'
        },
        {
          'blessing': 15,
          'createTime': '2020/01/10 14:43:58'
        },
        {
          'blessing': 42,
          'createTime': '2020/01/10 14:43:58'
        },
        {
          'blessing': 13,
          'createTime': '2020/01/10 14:43:57'
        },
        {
          'blessing': 24,
          'createTime': '2020/01/10 14:43:57'
        },
        {
          'blessing': 33,
          'createTime': '2020/01/10 14:43:57'
        },
        {
          'blessing': 30,
          'createTime': '2020/01/10 14:43:57'
        },
        {
          'blessing': 9,
          'createTime': '2020/01/10 14:43:56'
        },
        {
          'blessing': 8,
          'createTime': '2020/01/10 14:43:56'
        },
        {
          'blessing': 14,
          'createTime': '2020/01/10 14:43:56'
        },
        {
          'blessing': 18,
          'createTime': '2020/01/10 14:43:56'
        },
        {
          'blessing': 5,
          'createTime': '2020/01/10 14:43:56'
        },
        {
          'blessing': 4,
          'createTime': '2020/01/10 14:43:56'
        },
        {
          'blessing': 3,
          'createTime': '2020/01/10 14:43:55'
        },
        {
          'blessing': 2,
          'createTime': '2020/01/10 14:43:55'
        },
        {
          'blessing': 2,
          'createTime': '2020/01/10 14:43:55'
        }
      ]
    },
    'message': null
  }
  return data
}
/**
 * @description 我的排行奖励
 * @return {Object} data
 */
export const myRank = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/my-rank`)
  const data = {
    'code': 200,
    'data': {
      'myRank': 9,
      'currentAwards': '500元京东卡+50万金叶子',
      'nextAwards': '500元京东卡+50万金叶子'
    },
    'message': null
  }
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rank-list`)
  const data = {
    'code': 200,
    'data': {
      'myRank': 9,
      'myBlessing': 328,
      'currentAwards': '500元京东卡+50万金叶子',
      'nextAwardsDiffBlessing': 5,
      'rankList': [
        {
          'rank': 1,
          'userId': 520211,
          'nickname': '❄️勇闯天涯',
          'totalNum': 40000,
          'awardsName': '20000元京东卡+1500万金叶子',
          'profilePhoto': '/group1/M00/00/36/CiFVy1p4V0iAODeSAAA0R15IRDQ310.png',
          'updateTime': '1/10 14:32:47'
        },
        {
          'rank': 2,
          'userId': 520480,
          'nickname': '幽灵',
          'totalNum': 30000,
          'awardsName': '15000元京东卡+500万金叶子',
          'profilePhoto': '/group1/M00/00/37/CiFVy1p7x8yAbRooAABsfxP12L8492.png',
          'updateTime': '1/10 14:32:47'
        },
        {
          'rank': 3,
          'userId': 520205,
          'nickname': '石头',
          'totalNum': 10000,
          'awardsName': '8000元京东卡+200万金叶子',
          'profilePhoto': '/group1/M00/3F/53/CmcEHV0oWeCANib_AAALdy-IJu8601.jpg',
          'updateTime': '1/10 14:32:46'
        },
        {
          'rank': 4,
          'userId': 441606,
          'nickname': '137****1042',
          'totalNum': 438,
          'awardsName': '1500元京东卡+50万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:42'
        },
        {
          'rank': 5,
          'userId': 441600,
          'nickname': '12df1112qas',
          'totalNum': 420,
          'awardsName': '1500元京东卡+50万金叶子',
          'profilePhoto': '/group1/M00/00/89/CiFVy1x_RsaAF53tAAA-V6pw4BM863.png',
          'updateTime': '1/10 14:29:39'
        },
        {
          'rank': 6,
          'userId': 441595,
          'nickname': '137****1031',
          'totalNum': 405,
          'awardsName': '500元京东卡+50万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:35'
        },
        {
          'rank': 7,
          'userId': 441585,
          'nickname': '137****1021',
          'totalNum': 375,
          'awardsName': '500元京东卡+50万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:15'
        },
        {
          'rank': 8,
          'userId': 20954,
          'nickname': '',
          'totalNum': 333,
          'awardsName': '500元京东卡+50万金叶子',
          'profilePhoto': '',
          'updateTime': '11/3 14:58:10'
        },
        {
          'rank': 9,
          'userId': 10010783,
          'nickname': '166****0004',
          'totalNum': 328,
          'awardsName': '500元京东卡+50万金叶子',
          'profilePhoto': null,
          'updateTime': '11/3 17:19:08'
        },
        {
          'rank': 10,
          'userId': 441560,
          'nickname': '151****6667',
          'totalNum': 300,
          'awardsName': '500元京东卡+50万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:01'
        },
        {
          'rank': 11,
          'userId': 441605,
          'nickname': '137****1041',
          'totalNum': 290,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:41'
        },
        {
          'rank': 12,
          'userId': 441602,
          'nickname': '137****1038',
          'totalNum': 284,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:40'
        },
        {
          'rank': 13,
          'userId': 441599,
          'nickname': '昵称122',
          'totalNum': 278,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:37'
        },
        {
          'rank': 14,
          'userId': 441594,
          'nickname': '137****1030',
          'totalNum': 268,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:32'
        },
        {
          'rank': 15,
          'userId': 441590,
          'nickname': '137****1026',
          'totalNum': 260,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:22'
        },
        {
          'rank': 16,
          'userId': 441589,
          'nickname': '137****1025',
          'totalNum': 258,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:19'
        },
        {
          'rank': 17,
          'userId': 441588,
          'nickname': '137****1024',
          'totalNum': 256,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:16'
        },
        {
          'rank': 18,
          'userId': 441587,
          'nickname': '137****1023',
          'totalNum': 254,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:16'
        },
        {
          'rank': 19,
          'userId': 441586,
          'nickname': '137****1022',
          'totalNum': 252,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:16'
        },
        {
          'rank': 20,
          'userId': 441584,
          'nickname': '137****1020',
          'totalNum': 248,
          'awardsName': '300元京东卡+20万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:15'
        },
        {
          'rank': 21,
          'userId': 441576,
          'nickname': '137****1012',
          'totalNum': 232,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:13'
        },
        {
          'rank': 22,
          'userId': 441575,
          'nickname': '137****1011',
          'totalNum': 230,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:12'
        },
        {
          'rank': 23,
          'userId': 441570,
          'nickname': '137****1006',
          'totalNum': 220,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:11'
        },
        {
          'rank': 24,
          'userId': 441567,
          'nickname': '137****1003',
          'totalNum': 214,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:10'
        },
        {
          'rank': 25,
          'userId': 441563,
          'nickname': '11',
          'totalNum': 206,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': '11',
          'updateTime': '1/10 14:29:05'
        },
        {
          'rank': 26,
          'userId': 441561,
          'nickname': '185****8607',
          'totalNum': 202,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:04'
        },
        {
          'rank': 27,
          'userId': 441609,
          'nickname': '137****1045',
          'totalNum': 149,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:47'
        },
        {
          'rank': 28,
          'userId': 441608,
          'nickname': '137****1044',
          'totalNum': 148,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:47'
        },
        {
          'rank': 29,
          'userId': 441607,
          'nickname': '137****1043',
          'totalNum': 147,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:44'
        },
        {
          'rank': 30,
          'userId': 441604,
          'nickname': '137****1040',
          'totalNum': 144,
          'awardsName': '50元京东卡+5万金叶子',
          'profilePhoto': null,
          'updateTime': '1/10 14:29:41'
        }
      ]
    },
    'message': null
  }
  return data
}
/**
 * @description 返利领取
 * @param recordId 返利ID Number
 * @return {Object} data
 */
export const rebateReceive = async (recordId) => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rebate-receive/${recordId}`)
  const data = { 'code': 200, 'data': '领取成功', 'message': null }
  return data
}
/**
 * @description 返利记录
 * @return {Object} data
 */
export const rebateRecord = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rebate-record`)
  const data = {
    'code': 200,
    'data': {
      'totalRebate': 967,
      'rebateList': [
        {
          'id': 28,
          'rebate': 10,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 27,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 26,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 25,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 24,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 23,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 22,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 21,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 20,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 19,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 18,
          'rebate': 8,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 17,
          'rebate': 7,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 16,
          'rebate': 6,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 15,
          'rebate': 10,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 14,
          'rebate': 90,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 13,
          'rebate': 8,
          'createDate': '2020-01-10',
          'state': 0
        },
        {
          'id': 12,
          'rebate': 7,
          'createDate': '2020-01-10',
          'state': 1
        },
        {
          'id': 11,
          'rebate': 6,
          'createDate': '2020-01-10',
          'state': 1
        },
        {
          'id': 10,
          'rebate': 5,
          'createDate': '2020-01-10',
          'state': 1
        }
      ]
    },
    'message': null
  }
  return data
}
