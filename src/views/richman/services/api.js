import $axios from '../../../http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'


/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityinfo = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/activity-info`)
    // const data =
    // {
    //     "code": 200,
    //     "data": {
    //         "beginDate": "3月15日",
    //         "endDate": "3月18日",
    //         "releaseDate": "3月19日",
    //         "batchId": "20200315",
    //         "countdown": 42365000,
    //         "popupList": [
    //             {
    //                 "awardsNum": 12,
    //                 "awardsType": "jdk",
    //                 "propAwardsName": "100元京东券",
    //                 "propType": 1
    //               },
    //               {
    //                 "awardsNum": 15,
    //                 "awardsType": "jdk",
    //                 "propAwardsName": "120元京东券",
    //                 "propType": 0
    //               },
    //               {
    //                 "awardsNum": 5,
    //                 "awardsType": "hfq",
    //                 "propAwardsName": "120元京东券",
    //                 "propType": 4
    //               }
    //             //   {
    //             //     "awardsNum": 12,
    //             //     "awardsType": "jdk",
    //             //     "propAwardsName": "100元京东券",
    //             //     "propType": 0
    //             //   },
    //         ],
    //         "state": 1,
    //         "first": false
    //     },
    //     "message": null
    // }
    // {
    //     "code": 200,
    //     "data": {
    //         "beginDate": "3月15日",
    //         "endDate": "3月18日",
    //         "releaseDate": "3月19日",
    //         "batchId": "20200315",
    //         "countdown": 26309000,
    //         "popup": false,
    //         "first": false,
    //         "propType": 4,//0上榜1未上榜，2-金币新增,3-排名被反超，4-终极榜单 ,
    //         "propAwardsName": '800元京东券',//弹窗奖品名称
    //         "awardsNum": 3,//弹窗奖品数量
    //         "awardsType": 'hfq',//弹窗奖品类型
    //         "state": 1 //活动状态 0预热 1开始 2结束
    //     },
    //     "message": null
    // }
    return data
}
/**
 * @description 金币获取记录
 * @return {Object} data
 */
export const coinrecord = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/coin-record`)
    // const data = {

    //     "code": 200,
    //     "data": [
    //     //     {
    //     //     "date": "3-15 14:07",
    //     //     "coinNum": 1000
    //     // }, {
    //     //     "date": "3-15 14:10",
    //     //     "coinNum": 200
    //     // }
    // ],
    //     "message": null

    // }
    return data
}
/**
 * @description 往期榜单
 * @return {Object} data
 */
export const prerankinfo = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/pre-rank-info`)
    // const data = {
    //     "code": 200,
    //     "data": {
    //         "yesterdayList": [
    //             {
    //                 "awardsName": "800元京东券",
    //                 "coinNum": 5550,
    //                 "nickname": "这里是123123昵称",
    //                 "ranking": 1
    //               },
    //               {
    //                 "awardsName": "1元京东券",
    //                 "coinNum": 5550,
    //                 "nickname": "这里是昵称",
    //                 "ranking": 2
    //               },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 3
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 4
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 5
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 6
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 7
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 8
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 9
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 10
                //   },
                //   {
                //     "awardsName": "800元京东券",
                //     "coinNum": 5550,
                //     "nickname": "这里是昵称",
                //     "ranking": 11
                //   },
            // ],
            // "rankingList": [
                // {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "1-13",
                //     "ranking": 1
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "2-21",
                //     "ranking": 10
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "3-31",
                //     "ranking": 30
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "2-31",
                //     "ranking": 1
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "2-31",
                //     "ranking": 12
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "2-31",
                //     "ranking": 12
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "2-31",
                //     "ranking": 12
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "2-31",
                //     "ranking": 12
                //   },
                //   {
                //     "awardsName": "5000元京东券",
                //     "coinNum": 8,
                //     "date": "2-31",
                //     "ranking": 12
                //   },
                //   {
                //     "awardsName": "5元京东券",
                //     "coinNum": 8,
                //     "date": "2-31",
                //     "ranking": 12
                //   },

    //         ]
    //     },
    //     "message": null
    // }
    return data
}

/* 
* @description 每日排行列表
* @return {Object} data
*/
export const ranklist = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/rank-list`)
    // const data = {
    //     "code": 200,
    //     "data": {
    //         "myRank": 3,
    //         "coinNum": 1200,
    //         "popup": true,
    //         "onList": false,
    //         "lessCoinNum": 800,
    //         "currentAwards": "10元话费券",
    //         "rankList": [
    //             {
    //             "rank": 1,
    //             "userId": 1,
    //             "nickname": "曹翠",
    //             "coinNum": 2000,
    //             "awardsName": "100元话费券",
    //             "profilePhoto": "/group1/M00/00/8B/CiFVy1yPN_CAAggAAACmvBNRO4g970.png",
    //             "updateTime": "3-15 14:06",
    //             "level": 6
    //         }, {
    //             "rank": 2,
    //             "userId": 2,
    //             "nickname": "平兄",
    //             "coinNum": 1600,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:11",
    //             "level": 7
    //         }, {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }
    //         , {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 1200,
    //             "awardsName": "10元话费券",
    //             "profilePhoto": null,
    //             "updateTime": "3-15 14:10",
    //             "level": 7
    //         }

            
    //     ]
    //     },
    //     "message": null
    // }
    return data
}
/**
 * @description 总排行榜列表
 * @return {Object} data
 */
export const totalranklist = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/total-rank-list`)
    // const data = {
    //     "code": 200,
    //     "data": {
    //         "totalNum": 1200,
    //         "rankList": [
    //             {
    //             "rank": 1,
    //             "userId": 1,
    //             "nickname": "曹翠",
    //             "coinNum": 0,
    //             "awardsName": "5000元京东券",
    //             "profilePhoto": "/group1/M00/00/8B/CiFVy1yPN_CAAggAAACmvBNRO4g970.png"
    //         }, {
    //             "rank": 2,
    //             "userId": 2,
    //             "nickname": "平兄",
    //             "coinNum": 0,
    //             "awardsName": "3000元京东券",
    //             "profilePhoto": null
    //         }, {
    //             "rank": 3,
    //             "userId": 10010782,
    //             "nickname": "166****0003",
    //             "coinNum": 0,
    //             "awardsName": "1000元京东券",
    //             "profilePhoto": null
    //         }, {
    //             "rank": 4,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "coinNum": 0,
    //             "awardsName": "500元京东券",
    //             "profilePhoto": null
    //         }, {
    //             "rank": 5,
    //             "userId": 2000,
    //             "nickname": "陆江",
    //             "coinNum": 0,
    //             "awardsName": "300元京东券",
    //             "profilePhoto": null
    //         }
    //     ]
    //     },
    //     "message": null
    // }
    return data
}

/**
 * @description 测试
 * @return {Object} data
 */
export const test = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/incr`)
    return data
}










