/**
 * @param {array} arr 根据频道匹配的规则数组
 * @param {string} default 未匹配到频道的默认拼接url
 * @des 不同渠道跳转的链接不同
 * @return {string} url 最终跳转链接
 */
export const findUrl = (arr, defaultUrl = '') => {
  const channelFlag = window.linkUrl.getBackUrlFlag(GLOBALS.channel)
  const splitUrl = arr.find(res => res.channel === channelFlag).url
  return `https://wap.beeplaying.com/${channelFlag}/${splitUrl || defaultUrl}`
}
