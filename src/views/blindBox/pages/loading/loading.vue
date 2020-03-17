<template>
  <div class="loading"></div>
</template>
<script>
import utils from '@/common/js/utils'
import {getAccessToken} from '../../apis/bindPhone'
import _get from 'lodash.get'
export default {
  name: 'loading',
  created () {
    let token = utils.getUrlParam('token')
    if(token) {
      getAccessToken({
        token: token,
        type: 1
      }).then(res=> {
        let {code, data, message} = _get(res, 'data', {})
        if(code == 200) {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken)
          this.$router.push({
            name:'BlindBox'
          })
        }else {
          this.$toast.show({message})
        }
      })
    }else {
      this.$router.push({
        name:'BlindBox'
      })
    }
  }
}
</script>