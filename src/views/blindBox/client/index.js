import axios from '../http'
import pathReplace from './utils/pathReplace'

axios.interceptors.request.use(pathReplace)

axios.interceptors.response.use(
  response => {
    // console.log(response)
    // if (!response) alert(1)
  })

export default axios
