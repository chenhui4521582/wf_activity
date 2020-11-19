<template>
  <div class="profit-container" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
    <div class="profit-inner-container">
      <div class="profit-items">
        <div class="p-items p-items-header" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
          <ul class="p-item-title">
            <li style="border:none">
              <span><em class="i-ellipsis">排名</em></span>
              <span><em class="i-ellipsis">昵称</em></span>
              <span><em class="i-ellipsis">奖杯数/获得时间</em></span>
              <span><em class="i-ellipsis">奖励</em></span>
            </li>
          </ul>
        </div>
        <div class="p-items p-items-content">
          <ul class="p-item-title" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
            <li v-for="(item,index) in behindThreeData" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
              <span><i class="icon-dot" :class="'icon-dot'+item.rank"><template
                v-if="item.rank>3">{{item.rank}}</template><img
                :src="`${require(`../../img/rank${item.rank}.png`)}`" alt=""></i></span>
              <span><em class="i-ellipsis">{{item.nickname || ''}}</em></span>
              <span><em class="i-ellipsis"><template v-if="item.totalNum">{{item.totalNum}}个<br/><i class="i-font-style">{{item.updateTime || ''}}</i></template></em></span>
              <span><em class="i-ellipsis" v-html="item.awardsName.replace('+','<br>')"></em></span>
            </li>
            <li v-if="isOpen" v-for="(item,index) in otherData">
              <span><i class="icon-dot">{{item.rank}}</i></span>
              <span><em class="i-ellipsis">{{item.nickname || ''}}</em></span>
              <span><em class="i-ellipsis"><template v-if="item.totalNum">{{item.totalNum}}个<br/><i class="i-font-style">{{item.updateTime || ''}}</i></template></em></span>
              <span><em class="i-ellipsis" v-html="item.awardsName.replace('+','<br>')"></em></span>
            </li>
            <li v-if="!isOpen">
              <div class="btn-check-profit" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}"
                   @click.stop="closeOpenProfit">点击查看更多
              </div>
            </li>
            <li v-for="(item,index) in lastThreeData">
              <span><i class="icon-dot">{{item.rank}}</i></span>
              <span><em class="i-ellipsis">{{item.nickname || ''}}</em></span>
              <span><em class="i-ellipsis"><template v-if="item.totalNum">{{item.totalNum}}个<br/><i class="i-font-style">{{item.updateTime || ''}}</i></template></em></span>
              <span><em class="i-ellipsis" v-html="item.awardsName.replace('+','<br>')"></em></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        defaultImg: '/cdn/common/images/common/img_photo.png',
        isOpen: true
      }
    },
    props: {
      race: {
        type: Number,
        default: 0
      },
      isEnd: {
        type: Boolean,
        default: false
      },
      behindThreeData: {
        type: Array,
        default: () => []
      },
      otherData: {
        type: Array,
        default: () => []
      },
      lastThreeData: {
        type: Array,
        default: () => []
      },
      showOpen: {
        type: Boolean,
        default: false
      },
      showBtn: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    methods: {
      closeOpenProfit () {
        this.isOpen = true
      }
    },
    watch: {
      race () {
        this.isOpen = this.showOpen
      },
      showOpen () {
        this.isOpen = this.showOpen
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./index.less";

  .loading-wrap {
    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // background-color: rgba(0, 0, 0, 0);
    // z-index: 15;
  }

  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 10%;
  }

  .spinner {
    height: 100%;
    width: 100%;
    position: relative;
    margin: 0 auto;
  }

  .spinner div {
    width: 10%;
    height: 26%;
    background-color: #e2812a;
    position: absolute;
    left: 44.5%;
    top: 37%;
    opacity: 0;
    border-radius: 30%;
    animation: fade 1s linear infinite;
  }

  .spinner div.bar1 {
    transform: rotate(0deg) translate(0, -142%);
    animation-delay: 0s;
  }

  .spinner div.bar2 {
    transform: rotate(30deg) translate(0, -142%);
    animation-delay: -0.9167s;
  }

  .spinner div.bar3 {
    transform: rotate(60deg) translate(0, -142%);
    animation-delay: -0.833s;
  }

  .spinner div.bar4 {
    transform: rotate(90deg) translate(0, -142%);
    animation-delay: -0.75s;
  }

  .spinner div.bar5 {
    transform: rotate(120deg) translate(0, -142%);
    animation-delay: -0.667s;
  }

  .spinner div.bar6 {
    transform: rotate(150deg) translate(0, -142%);
    animation-delay: -0.5833s;
  }

  .spinner div.bar7 {
    transform: rotate(180deg) translate(0, -142%);
    animation-delay: -0.5s;
  }

  .spinner div.bar8 {
    transform: rotate(210deg) translate(0, -142%);
    animation-delay: -0.41667s;
  }

  .spinner div.bar9 {
    transform: rotate(240deg) translate(0, -142%);
    animation-delay: -0.333s;
  }

  .spinner div.bar10 {
    transform: rotate(270deg) translate(0, -142%);
    animation-delay: -0.25s;
  }

  .spinner div.bar11 {
    transform: rotate(300deg) translate(0, -142%);
    animation-delay: -0.1667s;
  }

  .spinner div.bar12 {
    transform: rotate(330deg) translate(0, -142%);
    animation-delay: -0.0833s;
  }

  @keyframes fade {
    from {
      opacity: 0.8;
    }
    to {
      opacity: 0.25;
    }
  }
</style>
