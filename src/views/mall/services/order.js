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

/**
* @description 取消订单
*/
const cancelOrder = function (params) {
  return Axios.post(Api.cancelOrder.replace('{orderId}', params))
}

/**
* @description 确定收货
*/
const confirmOrder = function (params) {
  return Axios.post(Api.confirmOrder.replace('{orderId}', params))
}

/**
* @description 获取订单详情
*/
const getOrderDetail = function (params) {
  return Axios.post(Api.getOrderDetail.replace('{orderId}', params))
}

const Service = {
  getAddress,
  payOrder,
  getOrderList,
  cancelOrder,
  confirmOrder,
  getOrderDetail
}

export default Service
export {
  getAddress,
  payOrder,
  getOrderList,
  cancelOrder,
  confirmOrder,
  getOrderDetail
}