import client from '../client'

// 是否签到
export const SignInState = () => client.post(`@box/score/sign-in-state`)

// 积分首页信息
export const Index = () => client.post(`@box/score/index`)

// 签到
export const SignIn = () => client.post(`@box/score/sign-in`)

// banner
export const Banner = () => client.get('//platform-api.beeplaying.com/wap/api/fixed/ad/get-list/30')

// 兑换
export const Exchange = id => client.post(`@box/score/exchange/${id}`)

// 积分获取列表
export const AddList = ({ page, pageSize }) => client.post(`@box/score/add-list`, { page, pageSize })

// 积分兑换列表
export const MinusList = ({ page, pageSize }) => client.post(`@box/score/minus-list`, { page, pageSize })
