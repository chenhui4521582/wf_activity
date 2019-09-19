<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="bonus-record" v-if="show" :class="{empty:!list.length}">
        <div class="title">获取养料详情</div>
        <div class="title">时间</div>
        <div class="content" :class="{empty:!list.length}">
          <scroll :data="list" v-if="list.length">
            <ul>
              <!--activityName: "参与“加赠红包，超值回馈”获得4个红包"-->
              <!--amount: 4-->
              <!--receiveTime: "2019-01-17 14:23:52"-->
              <li v-for="item in list">
                <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width: 3.2rem;height: 0.35rem;line-height: 0.35rem;">{{item.receiveRemark}}</div>
                <div>{{item.receiveDate&&item.receiveDate.split(' ')[0]||''}}</div>
              </li>
            </ul>
          </scroll>
          <template v-else>
            <div>
              <img src="../images/pop/record/empty.png" alt="" style="width: 1rem;height: 1rem">
              <div style="font-size: .24rem;color:#a04337;text-align: center;margin-top: .2rem;">无记录</div>
            </div>
          </template>
        </div>
        <div class="btn" @click="close(1)">获取更多翻牌点</div>
        <div class="info">
          充值金叶可获得翻牌点<br>
          累计获得总翻牌点可获得最高奖励<i>30000元京东卡</i>
        </div>
        <div class="close" @click="close(0)"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
  import scroll from './scroll'
  import {gameReceiveRecord } from '../utils/api'
  export default {
    data() {
      return {
        list:[]
      }
    },
    props:{
      show:{
        type: Boolean,
        default: false
      }
    },
    components:{
      scroll
    },
    methods: {
      besure(){
        GLOBALS.buriedPoint('1207003021','春节红包-红包记录-关闭')
        this.$emit('close')
      },
      close(flag){
        if(!flag){//关闭按钮

        }else{
          GLOBALS.marchSetsPoint('A_H5PT0156001800')//H5平台-翻牌活动-弹窗反馈-翻牌点记录弹窗-获取更多翻牌点点击
          this.$emit('package')
        }
        this.$emit('close')
      }
    },
    async mounted(){
      let {code,data}=await gameReceiveRecord()
      if(code==200){
        this.list=data
      }
    }
  }
</script>
<style lang="less" scoped>
  .pop-window {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    .pop-close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: -0.34rem;
      top: -0.34rem;
    }
  }
  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 10;
  }
  .bonus-record{
    position: fixed;
    top: 1.64rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5rem;
    height: 6.7rem;
    background: url("../images/pop/record/bg.png");
    background-size: 100% 100%;
    z-index: 11;
    .title{
      font-size:.24rem;
      font-weight:400;
      color:rgba(255,220,142,1);
      position: absolute;
      top:.95rem;
      &:nth-child(1){
        left: 1.43rem;
      }
      &:nth-child(2){
        right: .9rem;
      }
    }
    .content{
      position: absolute;
      top: 1.4rem;
      left: .3rem;
      right: .36rem;
      font-size: .2rem;
      font-weight: bold;
      overflow: hidden;
      bottom: 2.03rem;
      &.empty{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      ul{
        display: flex;
        flex-direction: column;
        li{
          display: flex;
          justify-content: space-between;
          font-weight:400;
          color:rgba(252,172,147,1);
          margin-bottom: .23rem;
          align-items: center;
        }
      }
    }
    .close{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -.9rem;
      width: .57rem;
      height: .57rem;
      background: url("../pages/images/common/close.png");
      background-size: 100% 100%;
      font-size:.37rem;
      font-weight:bold;
      color:rgba(194,38,13,1);
    }
    &:not(.empty):before{
      content: '';
      position: absolute;
      left: 3.5rem;
      top:.95rem;
      width:.01rem;
      bottom: 2.03rem;
      background:rgba(236,188,108,1);
    }
    .btn{
      position: absolute;
      left:  .97rem;
      bottom: .97rem;
      width: 3.28rem;
      height: .87rem;
      line-height: .7rem;
      text-align: center;
      background: url("../images/pop/btn_yellow.png");
      background-size: 100% 100%;
      font-size:.31rem;
      font-weight:bold;
      color:rgba(144,79,34,1);
      padding-bottom: .2rem;
      box-sizing: border-box;
    }
    .info{
      position: absolute;
      top: 5.94rem;
      line-height: .3rem;
      font-size: .18rem;
      font-weight: bold;
      color: #3F1207;
      padding-bottom: .2rem;
      box-sizing: border-box;
      text-align: center;
      left: 0;
      right: 0;
      i{
        color: #CF5E20;
      }
    }
  }
  .scalc-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  @keyframes fadeAnimation {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
