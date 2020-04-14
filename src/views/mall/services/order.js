import Api from './api'
import Axios from './http'
/**
 * @description 获取收货
 */
const getAddress = function (params) {
  return Axios.post(Api.getAddress, params)
}

/**
* @description 获取商品详情
*/
const getProductDetail = function (params) {
  return Axios.post(Api.getProductDetail, params)
}
const Service = {
  getAddress
}

export default Service
export {
  getAddress
}