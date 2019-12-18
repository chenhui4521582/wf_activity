<template>
  <div class="luck-draw" v-if="awardList&&awardList.length">
    <div class="group-item">
      <div class="gift gift1">
        <img :src="awardList && awardList[0].awardImg|filter" class="turn-award" :class="{fee:awardList[0]&&awardList[0].awardName.includes('话费')}">
        <div class="awardName">{{awardList[0].awardName}}</div>
      </div>
      <div class="gift gift2">
        <img :src="awardList && awardList[1].awardImg|filter" class="turn-award" :class="{fee:awardList[1].awardName.includes('话费')}">
        <div class="awardName">{{awardList[1].awardName}}</div>
      </div>
      <div class="gift gift3">
        <img :src="awardList && awardList[2].awardImg|filter" class="turn-award" :class="{fee:awardList[2].awardName.includes('话费')}">
        <div class="awardName">{{awardList[2].awardName}}</div>
      </div>
      <div class="gift gift4">
        <img :src="awardList && awardList[3].awardImg|filter" class="turn-award" :class="{fee:awardList[3].awardName.includes('话费')}">
        <div class="awardName">{{awardList[3].awardName}}</div>
      </div>
    </div>
    <div class="group-item">
      <div class="gift gift0">
        <img :src="awardList && awardList[9] && awardList[9].awardImg|filter" class="turn-award" :class="{fee:awardList[9].awardName.includes('话费')}">
        <div class="awardName">{{awardList[9].awardName}}</div>
      </div>
      <template v-if="isStart||isPopLottery">
        <div class="gift cj-gift enstart">
          <span class="start-btn">
              <em class="text">每次转盘消耗 <img src="../pages/images/index/star.png" alt=""
                                           style="width: .37rem;height: .37rem"> <i>x3</i></em>
          </span>
        </div>
      </template>
      <template v-else>
        <div class="gift cj-gift" @click="starBtn">
                        <span class="start-btn">
                            <em class="text">每次转盘消耗 <img src="../pages/images/index/star.png" alt=""
                                                         style="width: .37rem;height: .37rem"> <i>x3</i></em>
                        </span>
        </div>
      </template>
      <div class="gift gift5">
        <img :src="awardList && awardList[4].awardImg|filter" class="turn-award" :class="{fee:awardList[4].awardName.includes('话费')}">
        <div class="awardName">{{awardList[4].awardName}}</div>
      </div>
    </div>
    <div class="group-item">
      <div class="gift gift9">
        <img :src="awardList && awardList[8] && awardList[8].awardImg|filter" class="turn-award" :class="{fee:awardList[8].awardName.includes('话费')}">
        <div class="awardName">{{awardList[8].awardName}}</div>
      </div>
      <div class="gift gift8">
        <img :src="awardList && awardList[7].awardImg|filter" class="turn-award" :class="{fee:awardList[7].awardName.includes('话费')}">
        <div class="awardName">{{awardList[7].awardName}}</div>
      </div>
      <div class="gift gift7">
        <img :src="awardList && awardList[6].awardImg|filter" class="turn-award" :class="{fee:awardList[6].awardName.includes('话费')}">
        <div class="awardName">{{awardList[6].awardName}}</div>
      </div>
      <div class="gift gift6">
        <img :src="awardList && awardList[5].awardImg|filter" class="turn-award" :class="{fee:awardList[5].awardName.includes('话费')}">
        <div class="awardName">{{awardList[5].awardName}}</div>
      </div>
    </div>
    <span class="luck-draw-active"></span>
    <pop-lottery v-if="isPopLottery" :lotteryParmas="awardResult" @close="closePopLottery"></pop-lottery>
  </div>
</template>
<script type="text/javascript">
  import API from '../../../api';
  import popLottery from './pop-lottery';

  export default {
    data() {
      return {
        stopStep: 1,
        runT: null,
        step: -1,
        during: 2,
        isShow: false,
        msg: '',
        currentMsg: '',
        currentId: 0,
        isStart: false,
        awardList: '',
        awardResult: '',
        isPopLottery: false,
      }
    },
    props: {
      beginAwardData: {
        default: ''
      },
      starnum:{
        type:Number,
        default: 0
      }
    },
    components: {
      popLottery
    },
    mounted() {
      this.awardList = this.beginAwardData;
    },
    methods: {
      goTennis() {
        this.isShow = false;
      },
      starBtn() {
        GLOBALS.marchSetsPoint('A_H5PT0211002237')
        if (this.starnum<2) {
          this.$emit('lessstar')
          return
        }
        this.isStart = true//表示已经摁下按钮
        this.axios.post('//ops-api.beeplaying.com/ops/api/koi/starLottery').then((response) => {
          if (response.data.code == 200) {
            this.$emit('refresh')
          // response.data.data={awardName: "20元话费券", awardImg: "/group1/M00/41/4A/CmcEHV3D_CyAEMBmAABYfxYadGA426.png", awardId: 731}
            this.awardResult =response.data.data;
            for (var i = 0; i < this.awardList.length; i++) {
              if (this.awardList[i].awardId == response.data.data.awardId) {
                this.currentMsg = response.data.data.awardName;
                this.stopStep = i + 1;
                this.runT = setTimeout(this.runF, 100);
                this.$set(this.awardResult, 'awardImg', this.awardList[i].awardImg)
              }
            }
          } else {
            this.$toast.show({
              message:response.data.message,
              duration: 2000
            })
          }
        })

      },
      close() {
        this.isShow = false;
      },
      addClass(obj, className) {
        //如果原来没有class
        if (obj.className == "") {
          obj.className = className;
        } else {
          var _index = this.classIndexOf(obj, className);
          //如果原来没有这个新加的class
          if (_index == -1) {
            obj.className += " " + className;
          }
        }
      },
      removeClass(obj, className) {
        //如果以前的元素不为空
        if (obj.className != "") {
          var arrClassName = obj.className.split(" ");
          var _index = this.classIndexOf(obj, className);
          //如果存在要删除的class
          if (_index != -1) {
            arrClassName.splice(_index, 1);
          }
          obj.className = arrClassName.join(" ");
        }
      },
      classIndexOf(obj, v) {
        var arrClassName = obj.className.split(" ");
        for (var i = 0; i < arrClassName.length; i++) {
          if (arrClassName[i] == v) {
            return i;
          }
        }
        return -1;
      },
      runF() {
        var that = this;
        if (this.step >= (40 + this.stopStep))//设置转动多少圈
        {
          this.addClass(document.querySelector(".gift" + (this.step % 10)), 'active');
          this.step = this.stopStep;
          this.during=2
          //弹窗显示处
          this.isPopLottery = true;
          clearTimeout(this.runT);//停止转动
          return
        }
        if (this.step >= (30 + this.stopStep)) { //在即将结束转动前减速
          this.during += 1;
        } else {
          if (this.during <= 2) { //控制中间转速
            this.during = 2;
          }
          this.during--;
        }
        this.step++;
        let oGift = document.querySelectorAll('.gift');
        for (var i = 0; i < oGift.length; i++) {
          that.removeClass(oGift[i], 'active');
        }
        this.addClass(document.querySelector(".gift" + (this.step % 10)), 'active')
        this.runT = setTimeout(this.runF, this.during * 50);
      },
      closePopLottery() {
        this.isPopLottery = false;
        this.isStart = false
        this.$emit('closePopLottery')
      },
    }
  }
</script>
<style lang="less">

  .luck-draw {
    text-align: center;
  }

  .gift {
    width: 1.48rem;
    height: 1.45rem;
    overflow: hidden;
    text-align: center;
    font-size: 0.28rem;
    color: rgba(20, 20, 20, 1);
    box-sizing: border-box;
    background: url(../pages/images/index/btn_gray.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &.active {
      background: url(../pages/images/index/btn_light.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .turn-award {
      max-width: 70%;
      &.fee{
        width: .72rem;
      }
    }
    .item-award {
      width: 100%;
      height: 0.72rem;
      position: relative;
      img {
        max-width: 80%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    &.gift1,&.gift3,&.gift6,&.gift8{
      :before{
        content: '';
        position: absolute;
        top:0;
        right: 0;
        width: .45rem;
        height: .45rem;
        background: url(../pages/images/index/corner.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }

  .group-item {
    height: 1.45rem;
    font-size: 0;
    display: flex;
    justify-content: space-around;
    margin-top: .17rem;
    &:nth-child(1) {
      margin-top: 0rem;
    }
  }

  .cj-gift {
    width: 3.22rem;
    height: 1.58rem;
    background: url(../pages/images/index/btn_midle.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    top: 0.01rem;
    &.enstart {
      background: url(../pages/images/index/btn_midle.png) no-repeat center center;
      background-size: 100% 100%;
    }
    &.gray {
      background: url(../pages/images/index/btn_midle.png) no-repeat center center;
      background-size: 100% 100%;
    }
    &:before {
      content: '转一局';
      position: absolute;
      left: 0;
      right: 0;
      top: .28rem;
      bottom: 0;
      margin: auto;
      font-size: .55rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-shadow: 2px 2px 0px rgba(254, 90, 1, 0.5);
    }
  }

  .start-btn {
    display: block;
    height: 1.25rem;
    .text {
      width: 100%;
      position: absolute;
      bottom: .28rem;
      left: 0;
      font-size: .24rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin: 0 .09rem;
      }
      i {
        color: rgba(255, 210, 0, 1);
      }
    }
  }

  .luck-draw-active {
    color: #ff0000;
  }

  .pop-send {
    width: 80%;
    height: 3.5rem;
    background: #fff;
    border-radius: 0.1rem;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 11;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    .pop-spirit {
      width: 3.23rem;
      height: 2.23rem;
      position: absolute;
      left: 50%;
      top: -1.24rem;
      transform: translateX(-50%);
    }
    h1 {
      font-size: 0.36rem;
      color: #474747;
      padding: 1.4rem 0 0.2rem 0;
    }
    p {
      font-size: 0.28rem;
      color: #777777;
    }
    .pop-button {
      width: 3.13rem;
      height: 0.9rem;
      position: absolute;
      left: 50%;
      bottom: 0.2rem;
      transform: translateX(-50%);
    }
    .pop-close {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
    }
  }

  .pop-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #000;
    opacity: 0.5;
    filter: alpha(opacity=50);
    z-index: 10;
  }

  .closebtn {
    margin: 0 auto 2rem !important;
  }
</style>
