<template>
  <div class="prize">
    <div class="prize_container">
      <div class="prize_big">
        <div class="prize_list" v-for="(i,key) in list" :key="key">
          <div class="prize_inner" v-html="i.text"></div>
          <div class="prize_btn" :style="{background:i.btnColor}" @click="look(key)">{{i.btnText}}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

  // import enjoy from './enjoy'

  export default {

    data() {

      return {
        prizeshow: true,
        list: [
          {
            text: `摇到<span class='num' style='font-weight: bold; margin:0 0.1rem;'>5</span>个一样的游戏图标可得特等奖`,
            btnText: "查看特等奖",
            btnColor: "#ED2437",
            id: "5"
          },
          {
            text: `摇到<span class='num' style='font-weight: bold; margin:0 0.1rem;'>4</span>个一样的游戏图标可得一等奖`,
            btnText: "查看一等奖",
            btnColor: "#CA17AD",
            id: "4"
          },
          {
            text: `摇到<span class='num' style='font-weight: bold; margin:0 0.1rem;'>3</span>个一样的游戏图标可得二等奖`,
            btnText: "查看二等奖",
            btnColor: "#BA4EFF",
            id: "3"
          },
          {
            text: `摇到<span class='num' style='font-weight: bold; margin:0 0.1rem;'>2</span>个一样的游戏图标可得三等奖`,
            btnText: "查看三等奖",
            btnColor: "#10B0E9",
            id: "2"
          },
          {
            text: `摇到<span class='num' style='font-weight: bold; margin:0 0.1rem;'>不同</span>的图标可得参与奖`,
            btnText: "查看参与奖",
            btnColor: "#0F8C3E",
            id: "1"
          }
        ]
      };
    },
    methods: {
      look: function (key) {
        this.$emit('openprize', this.list[key].id)
      },
      close() {
        this.prizeshow = false
      }
    }
  };
</script>
<style lang="less" scoped>
  .prize {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 8.31rem;
    background-color: #ffad00;
    width: 6.85rem;
    padding-bottom: 0.4rem;
    .prize_container {
      margin: 0 auto;
      display: block;
      width: 6.7rem;
      height: 4.07rem;
      background: url("../images/prizebackground.png");
      background-size: 100% 100%;

      .prize_inner {
        display: flex;
        align-items: center;
      }
    }
  }

  .prize_big {
    width: 92%;
    margin: 0 auto;
    // padding: 0.05rem 0.4rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 3.5rem;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .prize_list {
    width: 90%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    /* -webkit-box-pack: justify; */
    justify-content: space-between;
    /* padding-top: 0.47rem; */
    margin: 0 auto;
    font-size: 0.22rem;
    color: #444444;
    .prize_inner {

    }
  }

  .num {
    font-weight: bold !important;
    font-size: 0.22rem;
    color: #444444;
  }

  .prize_btn {
    width: 1.56rem;
    height: 0.42rem;
    border-radius: 0.2rem;
    line-height: 0.42rem;
    text-align: center;
    font-size: 0.22rem;
    font-weight: 500 !important;
    color: #ffffff;

  }

  // 查看奖品样式
  .rule-mask {
    touch-action: none;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 5;
    background-color: rgba(0, 0, 0, .5);
  }

  .rule-bg {
    position: relative;
    top: 3rem;
    width: 5.90rem;
    height: 6.89rem;
    background: #ed2437;
    border-radius: 0.20rem;
    margin: 0 auto;
  }

  .rule-bg-top {
    position: absolute;
    width: 6.27rem;
    height: 3.66rem;
    top: -2rem;
    left: -0.14rem;
  }

  .rule-bg-top img {
    width: 6.27rem;
    height: 3.66rem;
  }

  .rule-bg-top img:nth-child(2) {
    position: absolute;
    width: 2.33rem;
    height: 0.54rem;
    top: 2.01rem;
    left: 1.91rem;
  }

  .rule-text {
    position: relative;
    width: 5.08rem;
    height: 3.49rem;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.36rem;
    margin: 0 auto;
    top: 1.7rem;
  }

  .rule-text span {
    display: block;
  }

  .rule-bottom {
    position: relative;
    /* position: absolute; */
    /* bottom: 1rem; */
    top: 2.3rem;
    right: 0.3rem;
  }

  .rule-bottom img {
    width: 6.51rem;
    height: 1.18rem;
  }

  .close {
    background: url("../images/close-bg.png");
    background-size: 100% 100%;
    width: 0.81rem;
    height: 0.84rem;
    width: 0.81rem;
    height: 0.84rem;
    position: absolute;
    top: 1rem;
    left: 5.29rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close img {
    width: 0.35rem;
    height: 0.34rem;
  }
</style>
