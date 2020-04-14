import Api from './api'
import Axios from './http'
/**
 * @description 获取收货
 */
const getAddress = function (params) {
  return Axios.post(Api.getAddress, params)
}

/**
* @description 商品下单
*/
const payOrder = function (params) {
  return Axios.post(Api.payOrder, params)
}

/**
* @description 我的订单列表
*/
const getOrderList = function (params) {
  return Axios.post(Api.getOrderList.replace('{status}', params))
}




const Service = {
  getAddress,
  payOrder,
  getOrderList
}

export default Service
export {
  getAddress,
  payOrder,
  getOrderList
}