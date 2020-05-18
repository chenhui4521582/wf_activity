<template>
   <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">{{title}}</div>
      <div class="wrap">
        <!-- 攻略 + 奖励 -->
        <div class="bet-award" v-if="popupStatus == 1">
          <div class="nav">
            <div class="item" :class="{active: currentIndex == 1}" @click="handleClick(2)">攻略</div>
            <div class="item" :class="{active: currentIndex == 2}" @click="handleClick(1)">奖励</div>
          </div>
          <!-- strategy -->
          <div class="strategy" v-if="currentIndex == 1">
            <div class="item">
              <div class="key"></div>
              <div class="value"></div>
            </div>
          </div>
          <!-- award -->
          <div class="award" v-if="currentIndex == 2">
            <div class="item" v-for="(item, index) in betAwards" :key="index">
              <div class="item-title">{{awardTitle(item.stage)}}</div>
              <div class="level-item" v-for="(levelItem, levelIndex) in item.levelList" :key="levelIndex">
                <div class="key">{{levelName(levelItem.level)}}</div>
                <div class="award-item">
                  <div class="value" 
                    v-for="(awardItem, awardIndex) in levelItem.awardList" 
                    :key="awardIndex"
                  >
                    {{awardItem.awardsName}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="closed" @click="hide"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'popup',
  props: ['value', 'title', 'popupStatus', 'betAwards'],
  data: () => ({
    currentIndex: 1
  }),
  methods: {
    awardTitle (stage) {
      switch (stage) {
        case 1:
          return '普通刮刮乐（每次刮奖必中下列奖励之一）'
          break
        case 2: 
          return '中级刮刮乐（每次刮奖必中下列奖励之一）'
          break
        case 3: 
          return '超级刮刮乐（每次刮奖必中下列奖励之一）'
          break
      }
    },
    levelName (level) {
      console.log(level)
      switch (level) {
        case 1:
          return '特等奖'
          break
        case 2: 
          return '一等奖'
          break
        case 3: 
          return '二等奖'
          break
      }
    },
    handleClick (index) {
      this.currentIndex = index
    },
    hide() {
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped lang="less">
*{
  box-sizing: border-box;
}
.popup{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.7)
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5.89rem;
    z-index: 2;
    background: #649FEF;
    border-radius: .2rem;
    border:3px solid #000;
    transform: translate(-50%, -50%);
    .title {
      overflow: hidden;
      height: .93rem;
      line-height: .93rem;
      text-align: center;
      font-size: .36rem;
      color: #fff;
      border-bottom:3px solid #000;
      background: #0150E1;
      border-radius: .1rem .1rem 0 0;
    }
    .wrap {
      margin-top:.32rem;
      padding: 0 .2rem;
      min-height: 4.6rem;
      color: #fff;
      line-height: .4rem;
      font-size: .24rem;
      .bet-award {
        height: 6.85rem;
        .nav {
          margin-bottom: .2rem;
          display: flex;
          justify-content: center;
          .item {
            margin-right: .13rem;
            width: 2.05rem;
            height: .62rem;
            line-height: .62rem;
            text-align: center;
            color: #710C0C;
            font-size: .3rem;
            background: #FFD972;
            border-radius: .3rem;
            &.active {
              background: #fff;
              color: #0150E1;
            }
          }
        }
        .award {
          overflow-x: hidden;
          overflow-y: scroll;
          height: 5.7rem;
          -webkit-overflow-scrolling: touch;
          .item {
            margin-bottom: .2rem;
            border: 3px solid #000;
            border-radius: .2rem;
            background: #fff;
            &:last-child {
                margin-bottom: 0;
            }
            .item-title {
              padding-left: .3rem;
              height: .65rem;
              line-height: .55rem;
              color: #fff;
              border-radius: .1rem .1rem 0 0;
              background: #F59037;
              border-bottom: 3px solid #000;
            }
            .level-item {
              display: flex;
              justify-content: center;
              border-bottom: 1px solid #D3E6FF;
              font-size: .22rem;
              color: #666666;
              &:last-child {
                border: none
              }
              .key {
                width: 50%;
                min-height: .5rem;
                border-right: 1px solid #D3E6FF;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .award-item {
                width: 50%;
                .value {
                  min-height: .5rem;
                  border-bottom: 1px solid #D3E6FF;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  &:last-child {
                    border: none
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .closed {
    position: absolute;
    left: 50%;
    bottom: -.93rem;
    z-index: 3;
    width: .6rem;
    height: .6rem;
    background: url(../img/close.png) no-repeat center center;
    background-size: 100% auto;
    transform: translate(-50%, 0);
  }
}
</style>