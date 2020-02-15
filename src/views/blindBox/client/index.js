import axios from '../http'
import pathReplace from './utils/pathReplace'

axios.interceptors.request.use(pathReplace)

export default axios
