import client from '../client'
/**
 * @description getRequestToken
 * @param params
 */

const getRequestToken = (params) => {
  return client.post(`@uci/user/login/sms/requestToken`, params)
}

/**
 * @description 发送验证码
 * @param params
 */

const sendCode = (params) => {
  return client.post(`@uci/user/login/sendSmsCode`, params)
}

/**
 * @description 获取token
 * @param params
 */

const getAccessToken = (params) => {
  return client.post(`@uci/user/login/accessToken`, params)
}

/**
 * @description 绑定手机
 * @param params
 */

const bindPhone = (params) => {
  return client.post(`@uci/user/center/bindMobilePhone`, params)
}

/**
 * @description 获取用户是否绑定过手机号
 * @param params
 */

const getUserBind = (params) => {
  return client.post(`@uci/user/center/getPhone`, params)
}

const Services = {
  bindPhone,
  sendCode,
  getAccessToken,
  getRequestToken,
  getUserBind
}
export {getRequestToken,bindPhone, sendCode, getAccessToken, getUserBind}
export default Services