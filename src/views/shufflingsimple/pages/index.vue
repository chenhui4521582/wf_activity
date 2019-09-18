<template>
  <div class="wrapper">
    <div class="container">
      <div class="back" @click="back"></div>
      <img class="header" src="./images/header.png"/>
      <card :isBeginAnimate="infoData.openFlag && !infoData.todayReceivedFlag"></card>
      <div style="position: absolute;top: 9.2rem;left: 0;right: 0;">
        <div class='status'>{{status_str}}</div>
        <!-- 跑马灯 -->
        <horn-list :noticeList="infoData.horseRaceLampList"
                   v-if="infoData&&infoData.horseRaceLampList&&infoData.horseRaceLampList.length"/>
        <img class="btn_submit" src='./images/bg_btn.png' v-if="infoData&&infoData.todayReceivedFlag"/>
        <div class="btn_submit" v-else></div>
        <div class="rules">
          <div class="title">活动规则</div>
          <div class="rules_wrapper">
            <ul>
              <li>
                <div>本期活动每人每天都一次免费翻牌抽奖活动，奖品即时发放；</div>
              </li>
              <li>
                <div>每个小时段内都有均等话费券数量发放；</div>
              </li>
              <li>
                <div>每个用户一天最多获得一次奖励；</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {betAwards} from '../utils/api'
  import HornList from '../components/hornList'
  import Card from '../components/card'

  export default {
    name: 'index',
    data() {
      return {
        status_str: '任意翻牌抽奖，100%中奖',
        infoData: null
      }
    },
    components: {
      HornList, Card
    },

    methods: {
      back() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
      },
      async getActInfo() {
        let {code, data} = (await this.axios.post('//ops-api.beeplaying.com/ops/api/fanpai/info')).data
        if (code == 200) {
          this.infoData = data;
          this.infoData.horseRaceLampList = ['33333', '4444', '555555555']//
          if (this.infoData.openFlag && this.infoData.todayReceivedFlag) {
            this.status_str = '今天的翻牌机会已用完'
          }
        }
      },
    },
    async mounted() {
      this.getActInfo()
    },
    watch: {}
  }
</script>
<style lang="less">
  html {
    /*font-size: 625%;*/
    /*-ms-text-size-adjust: 100%;*/
    /*-webkit-text-size-adjust: 100%;*/
    height: auto;
    overflow: auto;
  }
</style>
<style lang="less" scoped>
  @import "./css/index.less";
</style>
