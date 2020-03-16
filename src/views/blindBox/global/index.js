import { UserInfo } from '../apis/user'

// 跳转公众号url
export const WechatUrl = ''
// 是否是公众号渠道
export const isWechat = localStorage.getItem('APP_CHANNEL') === '110005001'
// 是否关注公众号
export const isFollowWechat = async () => {
  const { data: { data: { binding } } } = await UserInfo()
  return binding || false
}
