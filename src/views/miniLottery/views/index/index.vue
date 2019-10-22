<template>
  <div class="index">
    <Header title="夺宝活动"/>
    <div class="contaier">
      
    </div>
    <popup v-model="showPopup" :popupStatus="popupStatus"/>
  </div>
</template>
<script>
import _get from 'lodash.get'
import Popup from './components/popup'
export default {
  name: 'index',
  data: ()=> ({
    showPopup: true,
    popupStatus: 1
  }),
  components: {
    Popup
  },
  computed: {},
  
  methods: {

  }
}
</script>
<style lang="less" scoped>
  
</style>