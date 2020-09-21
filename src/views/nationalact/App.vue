<template>
  <div id="app">
    <div class="national-wrap">
      <p class="back" @click="back"></p>
      <div class="national-bg">
        <p>购礼包玩抽奖赢<i>iphone</i></p>
        <!-- 礼包 -->
        <div class="giftbg">
          <div v-for="item in giftList">
            <p class="giftimg" :class="{'gift88':item.price==88}"></p>
            <p class="gift-detail" v-html="item.content"></p>
            <p class="buybtn" :class="{'gray':item.buyFlag == 0}" @click="goRecharge(item)">&yen;{{item.price}}</p>
            <p class="leftnum">每人限购{{item.limitTimes}}次</p>
          </div>
        </div>
      </div>
      <loading v-show="showLoading"></loading>
    </div>
  </div>
</template>

<script>
  import loading from '../../components/common/loading.vue'

  export default {
    name: 'app',
    data() {
      return {
        giftList: [],
        activeIndex: 0
      }
    },
    mounted() {
    },
    computed: {},
    components: {
      loading
    },
    methods: {
      back(){
      },
      goRecharge(item){

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/base.css';
  @import './index.less';
</style>
