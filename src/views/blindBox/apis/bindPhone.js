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
 * @description 绑定手机获取验证码
 * @param params
 */

const getSendCode = (params) => {
  return client.post(`@uci/user/center/sendPhoneBindCode`, params)
}

/**
 * @description 获取用户是否绑定过手机号
 * @param params
 */

const getUserBind = (params) => {
  return client.post(`@uci/user/center/getPhone`, params)
}

/**
 * @description 用户手机号绑定微信
 * @param params
 */

const bindWechat = (params) => {
  return client.post(`@uci/user/login/sms/requestTokenWithBind`, params)
}

/**
 * @description 获取微信配置
 * @param params
 */

const getWechatConfig = (params) => {
  return client.post(`//platform-api.beeplaying.com/wap/api/oauth/wx/config`, params)
}

const Services = {
  bindPhone,
  sendCode,
  getAccessToken,
  getRequestToken,
  getUserBind,
  bindWechat,
  getWechatConfig,
  getSendCode
}
export {getRequestToken, bindPhone, sendCode, getAccessToken, getUserBind, bindWechat, getWechatConfig, getSendCode}
export default Services