<template>
  <section class="rule" :style="{zIndex:isShowPop?2:1}">
    <img src="../images/gonglue.png" alt="" @click="showPop" class="icon">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <scroll>
              <div class="gonglue-container">
                <img src="../images/pop/gonglue/buzhou.png" alt="" class="buzhou">
                <div class="bonus">
                  <div class="item">
                    <div class="item1">500金叶子</div>
                    <div class="item1">0.4元话费券</div>
                    <div class="item1">0.4元京东券</div>
                    <div class="item1">0.5元话费券</div>
                    <div class="item1">1元京东卡</div>
                    <div class="item1">50g鱼干</div>
                  </div>
                  <div class="item">
                    <div class="item1">10000金叶子</div>
                    <div class="item1">10元话费券</div>
                    <div class="item1">15元京东券</div>
                    <div class="item1">18元话费券</div>
                    <div class="item1">28元京东卡</div>
                    <div class="item1">100g鱼干</div>
                  </div>
                  <div class="item">
                    <div class="item1">70000金叶子</div>
                    <div class="item1">70元话费券</div>
                    <div class="item1">88元京东券</div>
                    <div class="item1">88元话费券</div>
                    <div class="item1">128元京东卡</div>
                    <div class="item1">1000g鱼干</div>
                  </div>
                </div>
              </div>
            </scroll>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    name: "rule",
    data () {
      return {
        isShowPop: false
      };
    },
    props: {
      ruleMain: {
        type: String,
        default: ""
      },
      from: {
        type: Number,
        default: 0
      }
    },
    components:{
      scroll:()=>import('./scroll')
    },
    methods: {
      showPop () {
        this.isShowPop = true
        if (this.from) {
          GLOBALS.marchSetsPoint('A_H5PT0075001482')   // H5平台-砸金蛋-活动已结束-点击规则
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0075001459')   // H5平台-砸金蛋-点击规则
        }
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: .64rem;
    left: 50%;
    margin-left: -2.81rem;
    img.icon {
      width: 0.88rem;
      height: 0.88rem;
      position: fixed;
      right: 0.04rem;
      top: 2.75rem;
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
        width: 5.62rem;
        height:7.64rem;
        background: url("../images/pop/gonglue/bg.png") no-repeat center center /
        100% 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 2.72rem 0.56rem 0;
        .main {
          height: 4.4rem;
          overflow: hidden;
          position: absolute;
          top: 2.72rem;
          width: 4.5rem;
          .gonglue-container{
            .buzhou{
              width: 4.5rem;
              height:2.92rem;
            }
            .bonus{
              height:3.8rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              .item{
                width: 4.5rem;
                height: 1.2rem;
                padding:.28rem 0 .28rem .5rem;
                box-sizing: border-box;
                display: flex;
                flex-wrap: wrap;
                &:nth-child(1){
                  background: url("../images/pop/gonglue/level1.png") no-repeat center center /
        100% 100%;
                }
                &:nth-child(2){
                  background: url("../images/pop/gonglue/level2.png") no-repeat center center /
        100% 100%;
                }
                &:nth-child(3){
                  background: url("../images/pop/gonglue/level3.png") no-repeat center center /
        100% 100%;
                }
                .item1{
                  text-align: center;
                  width: 33.3%;
                  font-size:.18rem;
                  font-weight:400;
                  color:rgba(252,227,128,1);
                  line-height: .35rem;
                }
              }
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
