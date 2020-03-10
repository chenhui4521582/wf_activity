import $axios from '../../../http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/rebate-wheel/activity-info`)
    // const data =
    // {
    //     "code": 200,
    //     "data": {
    //         "state":1,  //0未开始 1活动进行中 2 活动已结束
    //         "beginDate": "2020-03-04 00:00:00",
    //         "endDate": "2020-03-06 23:59:59",
    //         "timeline": "2020年3月4日-2020年3月6日",
    //         "countdown": '1321321',  
    //         "remnantNum": 1234,   //剩余数
    //         "nextConsume": 50,  //下次消耗
    //         "rarePropNum": 99999,  //已有人数
    //         "incrPropNum": 0,
    //         "wheelAwardsList": [{
    //             "awardsType": "flk",
    //             "awardsName": "1%超级返利卡",
    //             "sort": 1,
    //             "state": 0
    //         }, {
    //             "awardsType": "jdk",
    //             "awardsName": "100元京东券",
    //             "sort": 2,
    //             "state": 1
    //         }, {
    //             "awardsType": "hfq",
    //             "awardsName": "250元话费券",
    //             "sort": 3,
    //             "state": 1
    //         }, {
    //             "awardsType": "hfq",
    //             "awardsName": "88元话费券",
    //             "sort": 4,
    //             "state": 1
    //         }, {
    //             "awardsType": "jdk",
    //             "awardsName": "150元京东券",
    //             "sort": 5,
    //             "state": 1
    //         }, {
    //             "awardsType": "hfq",
    //             "awardsName": "50元话费券",
    //             "sort": 6,
    //             "state": 1
    //         }, {
    //             "awardsType": "jdk",
    //             "awardsName": "60元京东券",
    //             "sort": 7,
    //             "state": 0
    //         }, {
    //             "awardsType": "yhq",
    //             "awardsName": "300元减35优惠券",
    //             "sort": 8,
    //             "state": 0
    //         }, {
    //             "awardsType": "jyz",
    //             "awardsName": "25000金叶子",
    //             "sort": 9,
    //             "state": 0
    //         }, {
    //             "awardsType": "jdk",
    //             "awardsName": "12元京东券",
    //             "sort": 10,
    //             "state": 0
    //         }]
    //     },
    //     "message": null
    // }
    

    return data
}
/**
 * @description 投注
 * @return {Object} data
 */
export const bet = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/rebate-wheel/bet`)
    // const data =
    // {
    //     "code": 200,
    //     "data": {
    //         "remnantNum": 49950,
    //         "nextConsume": 100,
    //         "rarePropNum": 99999,
    //         "wheelAwards": {
    //             "awardsType": "yhq",
    //             "awardsName": "300元减35优惠券",
    //             "sort": 8,
    //             "state": 1
    //         }
    //     },
    //     "message": null
    // }
    
    

    return data
}
/**
 * @description 返利卡状态
 * @return {Object} data
 */
export const ratePropState = async (type) => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/rebate-wheel/rate-prop-state/${type}`)
    // const data = {

    // }
    return data
}

/**
 * @description 奖励列表
 * @return {Object} data
 */
export const userAwards = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/rebate-wheel/user-awards`)
    // const data = {

    // }
    return data
}








/**
 * @description 用户信息
 * @return {Object} data
 */

export const myrank = async () => {
    // const { data } =await  $axios.post(`${OPS_API_BASE_URL}/ops/api/kill-virus/my-rank`)
    const data = {

        "code": 200,
        "data": {
            "popup": true,
            "myRank": 30,
            "awardsList": [
                {
                    awardsName: "100",
                    awardsType: 'jyz'
                },
                {
                    awardsName: "260",
                    awardsType: 'jdk'
                },
                {
                    awardsName: "300",
                    awardsType: 'hfq'
                },

            ]
        },
        "message": null

    }
    return data
}
/**
 * @description 用户奖励
 * @return {Object} data
 */
// export const userAwards = async () => {
//     // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/kill-virus/user-awards`)
//     const data =
//     {
//         "code": 200,
//         "data": {
//             "hfqAmount": 10000,
//             "jdkAmount": 10,
//             "ygAmount": 1,
//             "jyzAmount": 1200,
//             "awardsList": [
//                 {
//                     awardsName: '1元话费',
//                     createTime: '07-01 10:18',
//                 },
//                 {
//                     awardsName: '1个鱼干',
//                     createTime: '07-01 10:19',
//                 },
//                 {
//                     awardsName: '10张京东卡',
//                     createTime: '07-01 10:20',
//                 },
//                 {
//                     awardsName: '1000个金叶',
//                     createTime: '07-01 10:21',
//                 },
//                 {
//                     awardsName: '1元话费',
//                     createTime: '07-01 10:18',
//                 },
//                 {
//                     awardsName: '1元话费',
//                     createTime: '07-01 10:18',
//                 },
//                 {
//                     awardsName: '1元话费',
//                     createTime: '07-01 10:18',
//                 },
//             ]
//         },
//         "message": null

//     }
//     return data
// }
/**
 * @description 投注奖励
 * @return {Object} data
 */
// export const bet = async (propType) => {
//     const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/kill-virus/bet/${propType}`)
//     // const data =
//     // {
//     //     "code": 0,
//     //     "data": {
//     //         "awardsInfo": [{
//     //             "awardsName": "5000",
//     //             "awardsType": "jdk"
//     //         }],

//     //         //   道具类型 
//     //         "propType": propType,
//     //         //   本次消灭数
//     //         "thisKillNum": 1233,
//     //         "userInfo": {
//     //             "totalKillNum": 122,
//     //             "totalVirusNum": 0,
//     //             // 用户道具
//     //             "userPropList": [
//     //                 {
//     //                     "propType": 0,
//     //                     // 剩余数
//     //                     "remnantNum": 0,
//     //                     "totalNum": 0,
//     //                     "useNum": 0
//     //                 }
//     //             ]
//     //         }
//     //     },
//     //     "message": "正常"
//     // }
//     return data
// }
/**
 * @description 排行榜
 * @return {Object} data
 */
export const ranklist = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/kill-virus/rank-list`)
    // const data = {
    //     "code": 200,
    //     "data": {
    //         "myRank": 123213,
    //         "totalNum": 0,
    //         "currentAwards": "20000元京东卡+1500万金叶子",
    //         "rankList": [{
    //             "rank": 1,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         }, {
    //             "rank": 2,
    //             "userId": 519426,
    //             "nickname": "131****2722",
    //             "totalNum": 163,
    //             "awardsName": "15000元京东卡+500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/27 16:50:20"
    //         },
    //         {
    //             "rank": 3,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 4,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 5,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 6,
    //             "userId": 99,
    //             "nickname": "李清13213213213213213213",
    //             "totalNum": 31712321321321321321,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 7,
    //             "userId": 99,
    //             "nickname": "尚林轩",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 8,
    //             "userId": 99,
    //             "nickname": "李清123123213213",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 9,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 10,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 11,
    //             "userId": 99,
    //             "nickname": "李清",
    //             "totalNum": 317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 12,
    //             "userId": 99,
    //             "nickname": "123",
    //             "totalNum": 31327,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         {
    //             "rank": 13,
    //             "userId": 99,
    //             "nickname": "123213123",
    //             "totalNum": 322317,
    //             "awardsName": "20000元京东卡+1500万金叶子",
    //             "profilePhoto": null,
    //             "updateTime": "2/26 22:05:20"
    //         },
    //         ]
    //     },
    //     "message": null

    // }
    return data
}
/**
 * @description 任务领取奖励
 * @return {Object} data
 */
export const taskReceive = async (type) => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/kill-virus/task-receive/${type}`)
    // const data = {

    // }
    return data
}
/**
 * @description 用户进度
 * @return {Object} data
 */
export const userprogress = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/kill-virus/user-progress`)
    // const data =
    // {
    //     "code": 200,
    //     "data": {
    //         // 任务进度
    //         "taskProgress": [{
    //             // 状态 0 未完成 1已完成未领取 2已完成已领取
    //             "state": 1,
    //             // 总数
    //             "totalNum": 30,
    //             "finishNum": 10,
    //             // 每日任务
    //             "idx": 1
    //         },
    //         {
    //             "state": 2,
    //             "totalNum": 10,
    //             "finishNum": 0,
    //             // 充值任务
    //             "idx": 2
    //         }],
    //         // 购买礼包次数
    //         "buyTime": 12,
    //         // 游戏进度
    //         "gameProgress": {
    //             // 游戏累消
    //             "gameBetting": 13,
    //             // 累消进度
    //             "progressList": [{
    //                 // 顺序
    //                 "sort": 1,
    //                 // 流水
    //                 "amount": 200000,
    //                 // 奖励
    //                 "propType": 1,
    //                 // 奖励数
    //                 "awards": 1,
    //                 // 状态 0 未完成1待领取 2已领取 
    //                 "status": 0
    //             }, {
    //                 "sort": 2,
    //                 "amount": 500000,
    //                 "propType": 1,
    //                 "awards": 2,
    //                 "status": 1
    //             }, {
    //                 "sort": 3,
    //                 "amount": 1000000,
    //                 "propType": 1,
    //                 "awards": 5,
    //                 "status": 2
    //             }, {
    //                 "sort": 4,
    //                 "amount": 3000000,
    //                 "propType": 1,
    //                 "awards": 15,
    //                 "status": 1
    //             }, {
    //                 "sort": 5,
    //                 "amount": 5000000,
    //                 "propType": 1,
    //                 "awards": 25,
    //                 "status": 1
    //             }, {
    //                 "sort": 6,
    //                 "amount": 10000000,
    //                 "propType": 1,
    //                 "awards": 60,
    //                 "status": 0
    //             }, {
    //                 "sort": 7,
    //                 "amount": 30000000,
    //                 "propType": 2,
    //                 "awards": 4,
    //                 "status": 0
    //             }, {
    //                 "sort": 8,
    //                 "amount": 50000000,
    //                 "propType": 2,
    //                 "awards": 6,
    //                 "status": 0
    //             }, {
    //                 "sort": 9,
    //                 "amount": 100000000,
    //                 "propType": 2,
    //                 "awards": 13,
    //                 "status": 0
    //             }, {
    //                 "sort": 10,
    //                 "amount": 300000000,
    //                 "propType": 2,
    //                 "awards": 39,
    //                 "status": 0
    //             }, {
    //                 "sort": 11,
    //                 "amount": 500000000,
    //                 "propType": 2,
    //                 "awards": 65,
    //                 "status": 0
    //             }, {
    //                 "sort": 12,
    //                 "amount": 1000000000,
    //                 "propType": 3,
    //                 "awards": 14,
    //                 "status": 0
    //             }, {
    //                 "sort": 13,
    //                 "amount": 1500000000,
    //                 "propType": 3,
    //                 "awards": 21,
    //                 "status": 0
    //             }, {
    //                 "sort": 14,
    //                 "amount": 2500000000,
    //                 "propType": 3,
    //                 "awards": 35,
    //                 "status": 0
    //             }, {
    //                 "sort": 15,
    //                 "amount": 3500000000,
    //                 "propType": 3,
    //                 "awards": 56,
    //                 "status": 0
    //             }, {
    //                 "sort": 16,
    //                 "amount": 4500000000,
    //                 "propType": 3,
    //                 "awards": 72,
    //                 "status": 0
    //             }]

    //         },
    //         "message": null
    //     }
    // }
    return data
}
/**
 * @description 累消领取奖励
 * @return {Object} data
 */
export const gamereceive = async (sort) => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/kill-virus/game-receive/${sort}`)
//     const data = {
        
//             "code": 200,
//             "data": {
//                 // 新增数量
//               "incrNum": 0,
// // 道具类型
//               "propType": 2
//             },
//             "message": "string"
//           }
    
    return data
}






export const betAwards = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api//kill-virus/bet-awards`)
    return data
}









/**
 * @description 获取记录
 * @return {Object} data
 */
export const findRecord = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/find-record`)
    return data
}
/**
 * @description 我的排行奖励
 * @return {Object} data
 */
export const myRank = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/my-rank`)
    return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rank-list`)
    return data
}
/**
 * @description 返利领取
 * @param recordId 返利ID Number
 * @return {Object} data
 */
export const rebateReceive = async (recordId) => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rebate-receive/${recordId}`)
    return data
}
/**
 * @description 返利记录
 * @return {Object} data
 */
export const rebateRecord = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rebate-record`)
    return data
}
