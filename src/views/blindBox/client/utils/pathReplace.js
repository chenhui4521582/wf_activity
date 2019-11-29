import * as urlMapper from '../data/shortMapper'

export default config => {
  // 没有lodash.cloneDeep 懒得写一个了
  const _config = JSON.parse(JSON.stringify(config))
  const _configUrl = String(_config.url).split('/').shift()
  const url = String(_config.url).replace(_configUrl, urlMapper[_configUrl.substring(1)])
  _config.url = url || _config.url
  return _config
}
