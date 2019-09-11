<template>
  <div class="wrapper">
    <div class="container">
        <img class="header" src="./images/header.png" />
        <ul class="list_cards">
          <li v-for='i in 3'>
            <img src='./images/hide_card.png' />
          </li>
        </ul>
        <div class='status'>{{status_str}}</div>

        <img class="btn_submit" src='./images/bg_btn.png' />
        
        <div class="rules">
          <div class="title">活动规则</div>
          <div class="rules_wrapper">
            <ul>
              <li><div>本期活动每人每天都一次免费翻牌抽奖活动，奖品即时发放；</div></li>
              <li><div>每个小时段内都有均等话费券数量发放；</div></li>
              <li><div>每个用户一天最多获得一次奖励；</div></li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { betAwards} from '../utils/api'
  export default {
    name: 'index',
    data () {
      return {
        status_str:'任意翻牌抽奖，100%中奖'
      }
    },
    components: {
      
    },
    
    methods: {
      
    },
    async mounted () {
      
    },
    watch: {
      
    }
  }
</script>
<style lang="less">
  html {
    font-size: 625%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    height: auto;
    overflow: auto;
  }
</style>
<style lang="less" scoped>
  @import "./css/index.less";
</style>
