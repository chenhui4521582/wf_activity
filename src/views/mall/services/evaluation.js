import Api from './api'
import Axios from './http'

/**
 * @description 地址管理页面  获取区信息
 */
const goodsCommit = function (params) {
    return Axios.post(Api.goodsCommit, params)
}

const Services = {
  goodsCommit
}
export {
  goodsCommit
}

export default Services