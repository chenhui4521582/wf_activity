import client from '../client'

// 是否签到
export const SignInState = () => client.post(`@box/score/sign-in-state`)

// 积分首页信息
export const Index = () => client.post(`@box/score/index`)

