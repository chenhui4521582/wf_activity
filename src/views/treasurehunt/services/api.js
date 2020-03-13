import $axios from '../../../http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
/**
 * @description 奖励列表
 * @return {Object} data
 */
export const ranklist = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/rank-list`)
    return data
}








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
    //         "rarePropNum": 0,  //已有人数
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
    return data
}

/**
 * @description 奖励列表
 * @return {Object} data
 */
export const userAwards = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/rebate-wheel/user-awards`)
    return data
}








