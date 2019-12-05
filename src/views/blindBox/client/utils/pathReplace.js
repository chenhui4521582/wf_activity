import * as urlMapper from '../data/shortMapper'

export default config => {
  let url
  const cloneDeep = require('lodash.clonedeep')
  const _config = cloneDeep(config)
  const _configUrl = String(_config.url).split('/').shift()
  url = String(_config.url)
  if (urlMapper[_configUrl.substring(1)]) url = String(_config.url).replace(_configUrl, urlMapper[_configUrl.substring(1)])
  _config.url = url || _config.url
  return _config
}
