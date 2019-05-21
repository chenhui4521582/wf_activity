import $axios from "../http"
/**
 * @description 获取话费券商城列表
 */
export const billList = async ()=>{
    const {data} = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/main')
    return data
}
/**
 * @description 话费卷获取
 * @param {Number} productId
 */
export const placeOrder = async (productId)=>{
    const {data} = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/placeOrder',{productId})
    return data
}
