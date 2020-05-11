<template>
  <div class="ranking">
    <Header title="排行榜" />
    <slider :info="info" />
    <div class="center">
      <div class="nav">
        <div class="item rank">排名</div>
        <div class="item nick-name">玩家</div>
        <div class="item num">获赞数量</div>
      </div>
      <div class="list" ref="list">
        <better-scroll ref="scroll" :data="list" :probeType="3" :listenScroll="true" @scroll="onScroll">
          <div class="list-item" ref="wrap" >
            <div class="items" v-for="(item, index) in list" :key="index">
              <div class="rank">{{item.rank}}</div>
              <div class="nick-name">
                <div class="avatar">
                  <img v-if="item.avatar" class="inner-img" :src="item.avatar | filter" alt="">
                  <img v-else class="inner-img" src="./img/img_photo.png" alt="">
                </div>
                {{item.nickName}}
              </div>
              <div class="num">
                {{item.praiseCount}}
              </div>
            </div>
          </div>
        </better-scroll>
      </div>
    </div>
    <div class="back-top" v-if="isBackTop" @click="backTop">
      <img class="inner-img" src="./img/back_top.png" alt="">
    </div>
  </div>
</template>
<script>
import BetterScroll from '../../components/scroll/scroll'
import Slider from './components/slider'
import Services from '../../services/services'
import _get from 'lodash.get'
export default {
  name: 'ranking',
  data: () => ({
    info: {},
    isBackTop: false
  }),
  components: {
    Slider,
    BetterScroll
  },
  computed: {
    list () {
      return _get(this.info, 'rankList', [])
    }
  },
  methods: {
    _getRanking () {
      Services.getRanking().then(res => {
        const {code, data, message} = _get(res, 'data', {})
        if (code == 200) {
          this.info = _get(res, 'data.data', [])
        }
      })
    },
    onScroll ({y}) {
      /** 是否显示返回顶部 **/
      if (Math.abs(Math.round(y)) > 200) {
        this.isBackTop = true
      } else {
        this.isBackTop = false
      }
    },
    /** 列表返回顶部 **/
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
      this.isBackTop = false
    },
  },
  mounted () {
    this._getRanking()
  }
}
</script>
<style scoped lang="less">
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.ranking {
  padding: .9rem .24rem;
  min-height: 100vh;
  background: #F7F7F7;
  .center {
    border-radius: .16rem;
    margin-top: .2rem;
    overflow: hidden;
    .nav {
      display: flex;
      justify-content: flex-start;
      background: #FFFAD4;
      .item {
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        &.rank {
          width: 30%;
        }
        &.nick-name {
          width: 40%;
        }
        &.num {
          width: 30%;
        }
      }
    }
    .list {
      position: relative;
      height: 75vh;
      overflow: hidden;
      .items {
        display: flex;
        justify-content: flex-start;
        background: #fff;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .24rem;
        &:nth-child(event) {
          background: #FFFDEF;
        }
        .rank {
          width: 30%;
          color: #888888;
        }
        .nick-name {
          width: 40%;
          color: #000000;
          display: flex;
          justify-content: center;
          align-items: center;
          .avatar {
            margin-right: .1rem;
            width: .3rem;
            height: .3rem;
          }
        }
        .num {
          width: 30%;
          color: #000;
        }
      }
    }
  }
  .back-top {
    position: absolute;
    right: .21rem;
    bottom: 1.02rem;
    width: .6rem;
    height: .6rem;
  }
}
</style>