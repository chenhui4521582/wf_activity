import MapperList from './mapper'

// 发货状态
export const sendStatusEnum = {
  UNCLAIMED: 1, // 未领取
  WILLSHIPPED: 2, // 待发货
  SHIPPED: 3, // 已发货
  RECOVER: 4 // 已回收
}

export const sendStatus = {
  [sendStatusEnum.UNCLAIMED]: '未领取',
  [sendStatusEnum.WILLSHIPPED]: '待发货',
  [sendStatusEnum.SHIPPED]: '已发货',
  [sendStatusEnum.RECOVER]: '已兑换'
}

export const sendStatusMapper = MapperList(sendStatus)
