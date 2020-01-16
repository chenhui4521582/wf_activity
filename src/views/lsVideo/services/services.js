import axios from './http'
const services = {
  /** 获取高光时刻信息 **/
  highlightTimeList: function(params) {
    let url = '//game-api.beeplaying.com/billiards/api/get/highlightTimeList'
    return axios.post(url, params)
  }
}
export default services