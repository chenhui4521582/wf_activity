import client from '../client'

// 是否签到
export const SignInState = () => client.post(`@box/score/sign-in-state`)
