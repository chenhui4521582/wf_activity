<template>
  <section class="rule" :style="{zIndex:isShowPop?11:2}">
    <!--<img src="../images/record.png" alt="" @click="showPop">-->
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title1">福袋全览</div>
          <div class="main">
            <div class="content">
              <scroll :data="list"  ref="scroll" :beforeScroll="true"
                      :listenScroll="true" :probeType="3">
                <div class="list">
                  <div class="item" v-for="(item,index) in list">
                    <div class="left">
                      {{getfudaiName(item.level)}}<br><i>({{item.useNum}}/{{item.totalNum}})</i></div>
                    <div class="right" :class="{ltfour:item.itemList.length<=4}">
                      <div class="right_item" v-for="(itemr,indexr) in item.itemList">{{itemr.awardsName}}(剩余{{itemr.totalNum-item.useNum}}张)</div>
                    </div>
                  </div>
                </div>
              </scroll>
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
  import {gameReceiveRecord} from '../utils/api'

  export default {
    props:{
      list:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      return {
        isShowPop: false
      }
    },
    components: {
      scroll
    },
    methods: {
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
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 1.3rem;
    left: 50%;
    margin-left: -2.9rem;
    img {
      width: 0.48rem;
      height: 1.23rem;
      &:not(.empty) {
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
        height: 8.06rem;
        background: rgba(93, 96, 254, 1);
        border-radius: .32rem;
        margin: 0 auto;
        box-sizing: border-box;
        .title1 {
          height: .97rem;
          line-height: .97rem;
          text-align: center;
          background: rgba(57, 9, 180, 1);
          border-radius: .32rem .32rem 0 0;
          font-size: .36rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        .main {
          font-size: 0.2rem;
          color: #fff;
          padding: .2rem 0.2rem 0;
          .content {
            height: 6.6rem;
            overflow: hidden;
            position: relative;
            .list{
              .item{
                width: 5.4rem;
                min-height:1.8rem;
                display: flex;
                background: #FFFFFF;
                border-radius: .2rem;
                margin-bottom: .16rem;
                .left{
                  width: .8rem;
                  font-size: .28rem;
                  text-align: center;
                  font-weight: bold;
                  background: #FF7F32;
                  padding: 0 .22rem;
                  text-align: center;
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  border-radius: .2rem 0 0 .2rem;
                  i{
                    font-weight: 400;
                    font-size: .18rem;
                    margin-top: .1rem;
                  }
                }
                .right{
                  width: 4.58rem;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  padding:0.1rem .2rem;
                  &.ltfour{
                    padding:0.3rem .2rem;
                  }
                  font-size:.18rem;
                  font-weight:bold;
                  color:rgba(57,9,180,1);
                  .right_item{
                    margin-top: .1rem;
                    margin-bottom: .1rem;
                    min-width: 50%;
                  }
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
