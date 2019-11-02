<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';

  export default {
    name: 'App',
    components:{
      index:()=>import('./pages/index')
    }
  }
</script>
