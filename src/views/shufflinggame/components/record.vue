<template>
  <section class="rule" :style="{zIndex:isShowPop?3:2}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <!-- <div class="title1">我的奖励</div> -->
           <div class="title1"><img src="../images/pop/record/rule-title.png" alt=""></div>
          <div class="main">
            <div class="toatl_awards">
              <div class="item" v-for="item in toalItems">
                <div class="img_bg">
                  <img :src="`${require(`../images/${item.awardsType}.png`)}`" alt class="game" />
                </div>
                <span>
                  {{item.name}}
                  <i>{{item.value}}</i>
                </span>
              </div>
            </div>
            <h4>翻牌记录</h4>
            <div class="bonus-record" :class="{empty:!record.length}">
              <div class="title_items">
                <div class="title">翻牌时间</div>
                <div class="title">翻牌奖励</div>
              </div>
              <div class="content" :class="{empty:!record.length}">
                <scroll :data="record" v-if="record.length">
                  <ul>
                    <li v-for="item in record">
                      <div>{{item.receiverTime}}</div>
                      <div>{{item.awardsName}}</div>
                    </li>
                  </ul>
                </scroll>
              </div>
            </div>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>
<script type="text/javascript">
import scroll from "./scroll";
import { gameReceiveRecord } from "../utils/api";

export default {
  data() {
    return {
      record: [],
      toalItems: [],
      isShowPop: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    scroll
  },
  methods: {
    besure() {
      GLOBALS.buriedPoint("1207003021", "春节红包-红包记录-关闭");
      this.$emit("close");
    },
    close(flag) {
      if (!flag) {
        //关闭按钮
      } else {
        GLOBALS.marchSetsPoint("A_H5PT0156001800"); //H5平台-翻牌活动-弹窗反馈-翻牌点记录弹窗-获取更多翻牌点点击
        this.$emit("package");
      }
      this.$emit("close");
    },
    async showPop() {
      let { code, data } = await gameReceiveRecord();
      if (code == 200) {
        this.toalItems = [
          {
            awardsType: "hfq",
            name: "话费券",
            value: data.hfqAmount
          },
          {
            awardsType: "jdk",
            name: "京东卡",
            value: data.jdkAmount
          },
          {
            awardsType: "jyz",
            name: "金叶",
            value: data.jyzAmount
          },
          {
            awardsType: "yg",
            name: "鱼干",
            value: data.ygAmount
          }
        ];
        this.record = data.awardsList;
        this.isShowPop = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.rule {
  position: fixed;
  top: 1rem;
  left: 50%;
  // margin-left: -2.86rem;
  margin-left: -3.55rem;
  img:not(.game) {
    width: 0.84rem;
    height: 0.84rem;
    position: fixed;
    right: 0;
    top: 0.36rem;
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
      width: 7.1rem;
      height: 10.24rem;
      background: url("../images/pop/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      // padding: 1.15rem 0.75rem 0.6rem 1rem;
      padding: 0rem 1.2rem 0.6rem 1rem;
      margin-top: -1rem;
      .title1 {
      position: absolute;
          width: 2.57rem;
          height: 0.72rem;
          top: 1.9rem;
    left: 50%;
    transform: translateX(-50%);
          img{
              width: 2.57rem;
          height: 0.72rem;
          position: static;
          }
      }
      .main {
        font-size: 0.2rem;
        padding: 3.7rem 0.5rem;;
        color: #fff;
        .text {
          display: flex;
          i {
            margin-top: 0.1rem;
            display: inline-block;
            width: 0.1rem;
            height: 0.1rem;
            background: rgba(236, 110, 71, 1);
            border-radius: 50%;
            margin-right: 0.18rem;
          }
          span {
            max-width: 4.2rem;
          }
          line-height: 0.3rem;
        }
        .toatl_awards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .item {
            width: 1.7rem;
            height: 1.66rem;
            background: url("../images/pop/record/total_item_bg.png");
            background-size: 100% 100%;
            margin-bottom: 0.15rem;
            .img_bg {
              height: 1.3rem;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 1.08rem;
                height: 1.08rem;
              }
            }
            span {
              margin-top: 0.05rem;
              font-size: 0.22rem;
              font-weight: 800;
              color: #b92a22;
              display: inline-block;
              text-align: center;
              width: 100%;
              i {
                color: #ff0400;
              }
            }
          }
        }
        h4 {
          font-size: 0.3rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 0.14rem;
        }
        .bonus-record {
          width: 3.98rem;
          height: 1.58rem;
          background: url("../images/pop/record/bg.png") no-repeat center center /
            100% 100%;
          position: relative;
          .title_items {
            display: flex;
            .title {
              flex: 1;
              text-align: center;
              height: 0.3rem;
              line-height: 0.32rem;
              
            }
          }
          .content {
            position: absolute;
            height: 1.2rem;
            top: 0.34rem;
            left: 0rem;
            right: 0;
            font-size: 0.18rem;
            font-weight: 400;
            color: #ffffff;
            overflow: hidden;
            ul {
              margin-top: 0.1rem;
              display: flex;
              flex-direction: column;
              li {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.2rem;
                line-height: 0.2rem;
                div {
                  flex: 1;
                  text-align: center;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
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
      margin: 0 auto;
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
