<template>
  <section class="rule" :style="{zIndex:isShowPop?11:2}">
    <img src="../images/record.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title1">我的福袋记录</div>
          <div class="main">
            <div class="bonus-record" v-if="list.length">
              <div class="title">序号</div>
              <div class="title">福袋</div>
              <div class="title">奖励</div>
              <div class="title">获奖时间</div>
              <div class="content">
                <scroll :data="list" @scrolltouchend="scrolltouchend" ref="scroll" :beforeScroll="true" :listenScroll="true" :probeType="3">
                  <ul>
                    <li v-for="(item,index) in list">
                      <div style="width: .6rem">{{index+1}}</div>
                      <div style="margin-left: .2rem;width: 1rem;margin-right: .1rem">金龙福袋</div>
                      <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 2rem;">2000元京东卡</div>
                      <div style="width: 2rem;text-align: center;">{{item.receiveDate||''}}</div>
                    </li>
                  </ul>
                </scroll>
              </div>
            </div>
            <div class="record-null" v-else>
              <img src="../images/pop/record/empty.png" alt="" class="empty">
              <div class="text">无记录</div>
            </div>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>
<script type="text/javascript">
  import scroll from './scroll'
  import {gameReceiveRecord } from '../utils/api'
  export default {
    data() {
      return {
        list:[],
        isShowPop: false
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
      },
      showPop () {
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0156001769')//H5平台-翻牌活动-中间区域-规则按钮点击
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
<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 1.64rem;
    left: 50%;
    margin-left: -2.9rem;
    img {
      width: 0.48rem;
      height: 1.23rem;
      &:not(.empty){
        position: fixed;
        right: 0rem;
        top: 1.42rem;
      }
    }

    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        width: 5.8rem;
        height: 6.66rem;
        background:rgba(210,34,111,1);
        border-radius:.32rem;
        margin: 0 auto;
        box-sizing: border-box;
        .title1{
          height: .97rem;
          line-height: .97rem;
          text-align: center;
          background:rgba(166,8,77,1);
          border-radius:.32rem .32rem 0 0;
          font-size:.36rem;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        .main {
          font-size: 0.2rem;
          font-weight: bold;
          color:rgba(236,110,71,1);
          padding: .2rem 0.2rem 0;
          .text{
            display: flex;
            i{
              margin-top: .1rem;
              display: inline-block;
              width:.1rem;
              height:.1rem;
              background:rgba(236,110,71,1);
              border-radius:50%;
              margin-right: .18rem;
            }
            span{
              max-width: 4.2rem;
            }
            line-height: 0.3rem;
          }
          .bonus-record {
            position: absolute;
            z-index: 11;
            left: 0;
            right: 0;
            height: 4.5rem;

            .title {
              font-size: .22rem;
              font-weight: 400;
              color: rgba(236, 244, 255, 1);
              position: absolute;
              &:nth-child(1) {
                left: .2rem;
              }
              &:nth-child(2) {
                left: 1rem;
              }
              &:nth-child(3) {
                left: 2.5rem;
              }
              &:nth-child(4) {
                right: .5rem;
              }
            }
            .content {
              position: absolute;
              height: 5rem;
              top: .34rem;
              left: 0rem;
              right: 0;
              font-size: .18rem;
              font-weight: 400;
              color: #fff;
              overflow: hidden;
              ul {
                margin-top: .1rem;
                display: flex;
                flex-direction: column;
                li {
                  display: flex;
                  justify-content: space-between;
                  height: .53rem;
                  border-bottom: 1px solid rgba(255,255,255,0.38);
                  box-sizing: border-box;
                  &:nth-child(1){
                    border-top: 1px solid rgba(255,255,255,0.38);
                  }
                  div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }
              }
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
        }
      }
      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin: 0.4rem auto 0;
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
  }
</style>
