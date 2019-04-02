<template>
  <transition name="scroll">
    <div class="ranking-list" v-show="isRanking">
      <div class="mask"></div>
      <div class="container" >
        <div class="header">
          <ul class="content">
            <li class="icon">名次</li>
            <li class="nick-name">昵称</li>
            <li class="blessings">福气值</li>
            <li class="price">奖励</li>
          </ul>
          <div class="closed" @click="hideComponent"></div>
        </div>
        <div class="scroll" ref="ranking">
          <ul class="list">
            <li v-for="(item, index) in rankingList">
              <div class="icon middle">
                <div class="icon-img " :class="'icon-img' + index">
                  <span>{{index + 1}}</span>
                </div>
              </div>
              <div class="nick-name middle">
                {{item.nickname}}
              </div>
              <div class="blessings middle">
                {{item.amount}}
              </div>
              <div class="price">
                <p
                  v-for="(innerItem, innerIndex) in item.awardInfoList"
                  :key="innerIndex"
                >
                  {{innerItem.name}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  import Scroll from 'better-scroll'
  export default {
    props: {
      isRanking: {
        type: Boolean,
        default: false
      },
	  rankingList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
	name: 'blessing-check-ranking',
    created () {

    },
    methods: {
      hideComponent () {
        this.$emit('hideRankingList', 'ranking')
      }
    },
    updated () {
	  let wrapper = this.$refs.ranking
	  let scroll = new Scroll(wrapper)
    },
    mounted () {

    }
  }
</script>

<style scoped lang="less">
.ranking-list{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.54);
  }
  .container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 7.95rem;
    background: #272D9F;
    z-index: 10;
    color: #fff;
    .header {
      background: #506BE4;
      position: relative;
      .content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: .76rem;
        li {
          font-size: .3rem;
          color: #020760;
          &.icon {
            padding-left: .22rem;
            box-sizing: border-box;
            width: 1.28rem;
          }
          &.nick-name {
            text-indent: .5rem;
            width: 2.06rem;
          }
          &.blessings {
            width: 1.56rem;
          }
          &.price {
            text-indent: .5rem;
            flex: 1;
          }
        }
      }
      .closed {
        position: absolute;
        width: .48rem;
        height: .48rem;
        right: .25rem;
        top: .14rem;
        background: url("../images/closed.png") no-repeat center center / 100% 100%;
      }
    }
    .scroll {
      height: 7.19rem;
      overflow: hidden;
      .list {
        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #2C43AE;
          font-size: .3rem;
          > div {
            height: 1.22rem;
          }
          .middle {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .icon {
            padding-left: .22rem;
            box-sizing: border-box;
            width: 1.28rem;
            .icon-img {
              width: .46rem;
              height: .46rem;
              border-radius: 50%;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .icon .icon-img0{
            background: #EEBA10;
          }
          .icon .icon-img1{
            background: #9263ED;
          }
          .icon .icon-img2{
            background: #506BE4;
          }
          .nick-name {
            width: 2.06rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .blessings {
            width: 1.56rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            p {
              max-width: 2.3rem;
              white-space: nowrap;
              &:first-child {
                margin-bottom: .08rem;
              }
            }
          }
        }
      }
    }

  }
}
.scroll-enter,.scroll-leave-to {
  bottom: -100%;
}

.scroll-enter-active,.scroll-leave-active{
  transition: all .3s;
}

</style>
