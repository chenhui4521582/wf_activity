<template>
  <div class="price-log" v-if="value">
    <div class="mask"></div>
    <div class="items">
      <div class="title">
        <img src="../img/seed-title.png" alt="">
      </div>
      <div class="title1">
        <img src="../img/seed-title1.png" alt="">
      </div>
      <div class="wrap">
        <div  
          :class="{'active': index == currentIndex}"
          v-for="(item, index) in treeList"
          :key="index" class="list" 
          @click="handClick(index)"
        >
          <img :src="item.awardImage | filter" alt="">
        </div>
      </div>
      <div class="srart-btn" @click="_getTree">
        <img src="../img/start-btn.png" alt="">
      </div>
      <div class="close" v-if="treeInfo" @click="hide"></div>
    </div>
  </div>
</template>
<script>
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'selectSeed',
  props: {
    treeList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
    },
    treeInfo: {
      default: null
    }
  },
  data: () => ({
    currentIndex: 0
  }),
  computed: {
    showList() {
      return this.treeList.length
    }
  },
  methods: {
    handClick (index) {
      this.currentIndex = index
    },
    hide() {
      this.$emit('hideCallback')
      this.$emit('input', false)
    },
    /** 开始种树 **/
    _getTree() {
      let id = this.treeList[this.currentIndex] && this.treeList[this.currentIndex].awardId
      if(!id) {return}
      Services.getTree(id).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.hide()
          this.$emit('treeCallback', data)
          this.$emit('awardUrl', this.treeList[this.currentIndex].awardImage)
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  .price-log{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background: rgba(0,0,0,.7);
    }
    img {
      width: 100%;
      height: 100%;
    }
    .items {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 6.92rem;
      height: 9.37rem;
      z-index: 2;
      background: url(../img/log-bg.png) no-repeat center center;
      background-size: 100% 100%; 
      transform: translate(-50%, -50%);
      .title {
        margin: .99rem 0 0 1.47rem;
        width: 3.93rem;
        height: .74rem;
      }
      .title1 {
        margin: .03rem 0 0 2.24rem;
        width: 2.35rem;
        height: .43rem;
      }
      .wrap {
        margin: .47rem .72rem 0 .93rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap; 
        .list {
          position: relative;
          margin: 0 .28rem .15rem 0;
          width: 2.35rem;
          height: 2.26rem;
          background: url(../img/seed-list.png) no-repeat center center;
          background-size: 100% 100%; 
          display: flex;
          justify-content: flex-start;
          align-items: center;
          &.active {
            background: url(../img/seed-list-active.png) no-repeat center center;
            background-size: 100% 100%; 
          }
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 1.47rem;
            height: auto;
          }
        }
      }
      .srart-btn {
        margin-left: 1.7rem;
        width: 3.52rem;
        height: 1.3rem;
        background: url(../img/btn1.png) no-repeat center center;
        background-size: 100% 100%;
        img {
          margin: .21rem 0 0 .8rem;
          width: 1.92rem;
          height: .57rem;
        }
      }
      .close {
        position: absolute;
        right: -.2rem;
        top: .18rem;
        width: 1.01rem;
        height: 1.05rem;
        background: url(../img/close.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
</style>