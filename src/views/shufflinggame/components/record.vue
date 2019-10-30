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
  .bonus-record {
    position: absolute;
    z-index: 11;
    left: 0;
    right: 0;
    height: 4.5rem;

    .title {
      font-size: .24rem;
      font-weight: 400;
      color: rgba(236, 244, 255, 1);
      position: absolute;
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        left: 1.9rem;
      }
      &:nth-child(3) {
        right: 0;
      }
    }
    .content {
      position: absolute;
      height: 4rem;
      top: .34rem;
      left: 0rem;
      right: 0;
      font-size: .18rem;
      font-weight: 400;
      color: rgba(255, 227, 166, 1);
      overflow: hidden;
      ul {
        margin-top: .1rem;
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: .2rem;
          line-height: .2rem;
        }
      }
    }
    .close {
      position: absolute;
      left: 2.63rem;
      bottom: -.9rem;
      width: .57rem;
      height: .57rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
      font-size: .37rem;
      font-weight: bold;
      color: rgba(194, 38, 13, 1);
    }
  }

  .record-null {
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1.27rem;
      height: 1.27rem;
    }
    .text {
      font-size: .5rem;
      font-weight: 400;
      color: rgba(169, 21, 40, 1);
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
