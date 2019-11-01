<template>
  <section class="rule" :style="{zIndex:isShowPop||flag==2||haveGif?11:2}">
    <div class="pop-mask" v-if="isShowPop||flag==2||haveGif" @touchmove.prevent>
      <img v-if="haveGif" :src="imgUrl" alt="">
    </div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop||flag==2">
        <div class="wrap" :class="{flag1:flag==1,flag2:flag==2,flag3:flag==3,flag4:flag==4}">
          <div class="main" :class="{flag1:flag==1,flag2:flag==2,flag3:flag==3,flag4:flag==4}">
            <template v-if="flag==1">
              <p>福袋券不足</p>
              <p>快去买个福袋礼包补充下</p>
              <div class="buy_btn" @click="close(this.flag)">买个福袋礼包</div>
            </template>
            <template v-if="flag==2">
              <p>恭喜你购买礼包成功</p>
              <p>送你<i style="color:#FFCF2F">{{ticketNum}}张</i>福袋券</p>
              <div class="buy_btn" @click="close(this.flag)">去开启福袋</div>
            </template>
            <div class="content" v-if="flag==3">
              <scroll :data="list"  ref="scroll" :beforeScroll="true"
                      :listenScroll="true" :probeType="3">
                <div class="list">
                  <div class="item" v-for="(item,index) in list">
                    <div class="left"><img :src="`${require(`../images/pop/fudai${item.level}.png`)}`" alt=""><div class="detail">{{getfudaiName(item.level)}}</div></div>
                    <div class="right" :class="{ltfour:item.itemList.length<=4}">
                      <div class="right_item" v-for="(itemr,indexr) in item.itemList">{{itemr.awardsName}}</div>
                    </div>
                  </div>
                </div>
              </scroll>
            </div>
            <div class="content_flag4" v-if="flag==4">
              <div class="top"><img :src="`${require(`../images/pop/fudai${list[0].level}.png`)}`" alt=""><div class="detail">{{getfudaiName(list[0].level)}}</div></div>
              <div class="bottom">{{list[0].itemList[0].awardsName}}奖励</div>
            </div>
          </div>
        </div>
        <div class="close-icon" @click="close"></div>
      </div>
    </transition>
  </section>
</template>
<script type="text/javascript">
  import imgUrl from '../images/open-fudai.gif'
  import scroll from './scroll'
  export default {
    data() {
      return {
        isShowPop: false,
        imgUrl: ''
      }
    },
    props:{
      flag:{
        type:Number,
        default:0//1.福袋券不足 2.购买成功 3.十连抽 4.单抽
      },
      ticketNum:{
        type:Number,
        default:0//支付成功福袋券个数
      },
      list:{
        type:Array,
        default:()=>[]
      },
      haveGif:{
        type:Boolean,
        default:false//动画
      }
    },
    components: {
      scroll
    },
    methods: {
      close(flag) {//1.福袋券不足 2.购买成功 3.十连抽 4.单抽
        if(flag==1){
          GLOBALS.marchSetsPoint('A_H5PT0209002216')//H5平台-双十一超值福袋活动-福袋券不足-引导购买页面-购买按钮点击
        }
        if(flag==2){

        }
        this.isShowPop=false
        this.$emit('close')
      },
      showPop() {
        this.isShowPop = true
      },
      getfudaiName(level){
        if(level==1){
          return '福禄福袋'
        }else if(level==2){
          return '紫云福袋'
        }else if(level==3){
          return '金龙福袋'
        }else{
          return '神运福袋'
        }
      }
    },
    watch: {
      haveGif (val) {
        if (val) {
          this.imgUrl = imgUrl + '?' + Date.now()
        }
      }
    },
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 1.64rem;
    left: 50%;
    margin-left: -2.9rem;
    img {
      width: 1.23rem;
      height: 1.16rem;
    }

    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
      img {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 4.67rem;
        height: 6.38rem;
        transform: translate(-50%, -50%);
      }
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        width: 5.8rem;
        height: 6.7rem;
        margin: 0 auto;
        box-sizing: border-box;
        &.flag1{
          background: url("../images/pop/sad.png");
          background-size: 100% 100%;
        }
        &.flag2{
          background: url("../images/pop/paysuccess.png");
          background-size: 100% 100%;
        }
        &.flag3{
          background: url("../images/pop/prize_success.png");
          background-size: 100% 100%;
        }
        &.flag4{
          background: url("../images/pop/prize_success.png");
          background-size: 100% 100%;
        }
        .main {
          font-size: 0.2rem;
          color: #fff;
          padding: .2rem 0.2rem 0;
          &.flag1,&.flag2{
            padding: 3.45rem 0.2rem 0;
            text-align: center;
            line-height: .5rem;
            p{
              font-size:.36rem;
              font-weight:500;
              color:rgba(255,255,255,1);
            }
            .buy_btn{
              width: 3.77rem;
              height: 1.03rem;
              text-align: center;
              background: url("../images/pop/btn.png");
              background-size: 100% 100%;
              margin:.65rem auto 0;
              font-size:.3rem;
              font-weight:bold;
              color:rgba(255,255,255,1);
              padding-bottom: .3rem;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          &.flag3,&.flag4{
            padding: 3rem 0.2rem 0;
          }
          .content {
            height: 3.5rem;
            overflow: hidden;
            position: relative;
            .list{
              .item{
                width: 5.4rem;
                min-height:1.6rem;
                display: flex;
                background:rgba(70,27,212,1);
                border-radius: .2rem;
                margin-bottom: .16rem;
                align-items: center;
                .left{
                  width: 1.31rem;
                  font-size: .28rem;
                  text-align: center;
                  font-weight: bold;
                  padding: 0 .2rem;
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border-radius: .2rem 0 0 .2rem;
                  position: relative;
                  i{
                    font-weight: 400;
                    margin-top: .1rem;
                    font-size: .18rem;
                  }
                  .detail{
                    position: absolute;
                    bottom: 0;
                    width:1.02rem;
                    height:.26rem;
                    line-height:.26rem;
                    text-align: center;
                    background:rgba(255,127,50,1);
                    border-radius:.13rem;
                    font-size:.18rem;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                  }
                }
                .right{
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  margin:.2rem;
                  width:3.89rem;
                  background:rgba(253,253,255,1);
                  border-radius:.1rem;
                  padding: 0.1rem .2rem;
                  &.ltfour{
                    padding:0.3rem .2rem;
                  }
                  font-size:.18rem;
                  font-weight:bold;
                  color:rgba(255,127,50,1);
                  .right_item{
                    margin-top: .1rem;
                    margin-bottom: .1rem;
                    min-width: 33.3%;
                  }
                }
              }
            }
          }
          .content_flag4{
            width:3.44rem;
            height:2.78rem;
            background:rgba(70,27,212,1);
            border-radius:.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: auto;
            .top{
              width: 1.31rem;
              font-size: .28rem;
              text-align: center;
              font-weight: bold;
              padding: 0 .2rem;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: .2rem 0 0 .2rem;
              position: relative;
              i{
                font-weight: 400;
                margin-top: .1rem;
                font-size: .18rem;
              }
              .detail{
                position: absolute;
                bottom: 0;
                width:1.02rem;
                height:.26rem;
                line-height:.26rem;
                text-align: center;
                background:rgba(255,127,50,1);
                border-radius:.13rem;
                font-size:.18rem;
                font-weight:400;
                color:rgba(255,255,255,1);
              }
            }
            .bottom{
              margin-top: .38rem;
              font-size:.3rem;
              font-family:Alibaba PuHuiTi;
              font-weight:bold;
              color:rgba(255,127,50,1);
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
