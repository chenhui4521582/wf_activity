<template>
  <div id="app">
    <template v-if="showindex">
      <index v-if="showindex==1"></index>
      <after v-else></after>
    </template>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';
  import {activityInfo} from './utils/api'

  export default {
    name: 'App',
    data(){
      return {
        showindex:0
      }
    },
    async mounted() {
      const {code, data} = await activityInfo()
      if (code === 200) {
        if (data.state==1) {
          this.showindex=1
        }else {
          this.showindex=2
        }
      }
    },
    components:{
      index:()=>import('./pages/index'),
      after:()=>import('./pages/after')
    }
  }
</script>
