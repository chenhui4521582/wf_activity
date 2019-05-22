import $axios from "../http"
/**
 * @description 获取话费券商城列表 新的接口
 */
export const billList = async ()=>{
    const {data} = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/mainNew')
    return data
}
/**
 * @description 话费卷获取
 * @param {Number} productId
 */
export const placeOrder = async (productId,count)=>{
    const {data} = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/placeOrder',{productId,count})
    return data
}
