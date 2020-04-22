import axios from './http'
const services = {
  /** 获取高光时刻信息 **/
  highlightTimeList: function(params) {
    let url = '//game-api.beeplaying.com/billiards/api/get/nowHighlightTimeList'
    return axios.post(url, params)
  },
  getMyVideo: function(params) {
    let url = 'http://rap2.taobao.org:38080/app/mock/250821/billiards/api/get/meHighlightTimeList'
    // let url = '//game-api.beeplaying.com/billiards/api/get/meHighlightTimeList'
    return axios.post(url, params)
  }
}
export default services