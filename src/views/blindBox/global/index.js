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

// 跳转客服 插入js
export const createService = () => {
  (function (w, d, n, a, j) {
    w[n] = w[n] || function () {
      return (w[n].a = w[n].a || []).push(arguments)
    }
    j = d.createElement('script')
    j.async = true
    j.src = 'https://qiyukf.com/script/f6ec9f5a8ce5c1e5285e3f769d2b52fd.js?hidden=1'
    d.body.appendChild(j)
  })(window, document, 'ysf')
}

// 跳转客服
export const toService = () => {
  const userInfo = JSON.parse(localStorage.getItem('user_Info'))
  let info = [
    {
      "key": "user_id",
      "label": "用户ID",
      "value": String(userInfo.userId)
    },
    {
      "key": "nickname",
      "label": "用户昵称",
      "value": String(userInfo.nickname)
    },
    {
      "key": "channel",
      "label": "渠道号",
      "value": userInfo.channelId
    },
    {
      "key": "channel_name",
      "label": "渠道名称",
      "value": userInfo.channelName
    },
    {
      "key": "cat_level",
      "label": "猫等级",
      "value": String(userInfo.catVipLev)
    },
    {
      "key": "sum_recharge",
      "label": "充值数量",
      "value": String(userInfo.sumRecharge) + '元'
    },
    {
      "key": "add_time",
      "label": "创建时间",
      "value": String(userInfo.createTime)
    }
  ]
  ysf('config', {
    uid: userInfo.userId,
    level: userInfo.catVipLev,
    data: JSON.stringify(info)
  })
}
