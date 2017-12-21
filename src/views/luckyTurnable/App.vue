<template>
    <div id="app">222
        <div class="turn-wrap">
            <!-- <loading v-show="showPage"></loading> -->

            <recharge v-if="isBuy"></recharge>
            <turntable v-else></turntable>
        </div>
    </div>
</template>
<script>
import utils from '../../common/js/utils.js'
import AppCall from '../../common/js/AppCall.js';
import API from '../../api';
export default {
     name : 'app',
    data(){
        return{
            isBuy : false

        }
    },
    components:{
        'recharge' : () => import('./components/recharge.vue'),
        'turntable' : () => import('./components/turntable.vue'),
    },
    mounted(){
        
        this.isBuy = utils.getUrlParam('isBuy') == 1 ? true : false
    },
}
</script>
<style lang="less" scoped>

@import './index.less';
</style>
