import Api from './api'
import Axios from './http'
/**
 * @description 获取商品列表
 */
const getProductList = function (params) {
  return Axios.post(Api.getProductList, params)
}

/**
* @description 获取商品详情
*/
const getProductDetail = function (params) {
  return Axios.post(Api.getProductDetail, params)
}
const Service = {
  getProductList,
  getProductDetail
}

export default Service
export {
  getProductList,
  getProductDetail
}