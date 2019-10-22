import axios from './http'
const services = {
  getList: function(params) {
    let url = ''
    return axios.post(url, params)
  }
}
export default services