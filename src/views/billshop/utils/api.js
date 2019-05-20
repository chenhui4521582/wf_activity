import $axios from "../http"
/**
 * @description 获取话费券商城列表
 */
export const billList = async ()=>{
    const {data} = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/main')
    return data
}