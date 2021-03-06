const Api = {
  getProductList: '//quoits-api.beeplaying.com/quoits/api/mall/buy/activity-info',
  getProductDetail: '//quoits-api.beeplaying.com/quoits/api/mall/buy/product-detail',
  getAddress: '//uic-api.beeplaying.com/uic/api/user/receiver/getReceiverInfoNew',
  payOrder: '//quoits-api.beeplaying.com/quoits/api/mall/buy/submit-order',
  getOrderList: '//quoits-api.beeplaying.com/quoits/api/mall/buy/order-list/{status}',
  cancelOrder: '//quoits-api.beeplaying.com/quoits/api/mall/buy/cancel-order/{orderId}',
  confirmOrder: '//quoits-api.beeplaying.com/quoits/api/mall/buy/confirm-order/{orderId}',
  getOrderDetail: '//quoits-api.beeplaying.com/quoits/api/mall/buy/order-detail/{orderId}',
  goodsCommit: '//shop-api.beeplaying.com/shop/api/award-comment/comment',
}
export default Api