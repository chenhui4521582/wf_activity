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
    top: 9.3rem;
    width: 6.85rem;
    padding-bottom: 0.4rem;
    .prize_container {
      margin: 0 auto;
      display: block;
      width: 6.7rem;
      height: 4.07rem;

      .prize_inner {
        display: flex;
        align-items: center;
      }
    }
  }

  .prize_big {
    width: 92%;
    margin: 0 auto;
    box-sizing: border-box;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    height: 3.5rem;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .prize_list {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    font-size: 0.22rem;
    color: #444444;
    height: .7rem;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(244, 209, 202, 1);
    &:nth-child(1) {
      border-top: 0
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
</style>
