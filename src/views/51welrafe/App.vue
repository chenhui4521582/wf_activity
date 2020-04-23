<template>
  <div class="welrafe">

  </div>
</template>
<script>
import Rule from './components/rule'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
export default {
  name: 'welrafe',
  data: ()=>({
  }),
  components: {
    Popup,
    Rule,
  },
  computed: {
  },
  methods: {},
  mounted() {
    this.init()
  }
}
</script>
<style scoped lang="less">
@import '../../common/css/base.css';
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.welrafe {
  
}
</style>
