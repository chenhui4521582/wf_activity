import client from '../client'

export const NoticeList = () => {
  return client.post('@box/notice-list')
}
